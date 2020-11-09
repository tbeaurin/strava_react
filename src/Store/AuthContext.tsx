import React, {
  useState,
  useEffect,
  createContext,
  ReactNode,
  SetStateAction,
} from 'react';
import { AthleteData } from '../Models/athlete';
import { OauthData } from '../Models/oauth';
import Constants from '../Resources/Constants/Constants';
import Routes from '../Resources/Routes/Routes';
import { get, post } from '../Services/api';
import NetworkUrls from '../Services/NetworkUrls';

type AuthContextInterface = {
  children: ReactNode;
};

type State = {
  athlete?: AthleteData;
  setAthlete: React.Dispatch<SetStateAction<AthleteData | undefined>>;
  authLoading: boolean;
  setAuthLoading: React.Dispatch<SetStateAction<boolean>>;
  isAuthenticated: boolean;
  redirectPathOnAuthentication: string;
  setRedirectPathOnAuthentication: React.Dispatch<
    SetStateAction<string>
  >;
  setIsAuthenticated: React.Dispatch<SetStateAction<boolean>>;
};

const AuthContext = createContext<State>({
  athlete: undefined,
  authLoading: true,
  isAuthenticated: false,
  redirectPathOnAuthentication: '',
  setAthlete: () => undefined,
  setIsAuthenticated: () => false,
  setRedirectPathOnAuthentication: () => '',
  setAuthLoading: () => true,
});

const setTokens = (oauthResponse: OauthData): void => {
  localStorage.setItem('access_token', oauthResponse.access_token);
  localStorage.setItem('refresh_token', oauthResponse.refresh_token);
  localStorage.setItem('expires_at', oauthResponse.expires_at);
  localStorage.setItem('expires_in', oauthResponse.expires_in);
};

function AuthProvider({
  children,
}: AuthContextInterface): JSX.Element {
  const [athlete, setAthlete] = useState<AthleteData>();
  const [authLoading, setAuthLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [
    redirectPathOnAuthentication,
    setRedirectPathOnAuthentication,
  ] = useState(Routes.homeScene);

  const checkToken = async () => {
    const storedToken = localStorage.getItem('access_token');
    const expiresAt = localStorage.getItem('expires_at');
    const isExpiredToken =
      expiresAt && parseInt(expiresAt, 10) * 1000 <= Date.now();
    if (storedToken && isExpiredToken) {
      const refreshToken = localStorage.getItem('refresh_token');
      const path = `${NetworkUrls.postOauthCode}?client_id=${Constants.clientId}&grant_type=refresh_token&client_secret=${Constants.clientSecret}&refresh_token=${refreshToken}`;
      const oauthResponse = await post({ path });
      setTokens(oauthResponse);
    }
  };

  const checkConnection = async (): Promise<void> => {
    await checkToken();
    const storedToken = localStorage.getItem('access_token');
    if (storedToken && storedToken !== undefined) {
      // Get athlete
      if (!athlete) {
        const path = `${NetworkUrls.getAthlete}?access_token=${storedToken}`;
        const getAthleteResponse = await get({ path });
        if (getAthleteResponse) {
          setAthlete(getAthleteResponse);
        }
      }
      setIsAuthenticated(true);
    }
    setAuthLoading(false);
  };

  useEffect(() => {
    checkConnection();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        athlete,
        authLoading,
        isAuthenticated,
        redirectPathOnAuthentication,
        setAthlete,
        setIsAuthenticated,
        setRedirectPathOnAuthentication,
        setAuthLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext, setTokens };
