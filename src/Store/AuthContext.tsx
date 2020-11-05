import React, {
  useState,
  useEffect,
  createContext,
  ReactNode,
  SetStateAction,
} from 'react';
import { AthleteData } from '../Models/athlete';
import Routes from '../Resources/Routes/Routes';
import { get } from '../Services/api';
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

  const checkConnection = async (): Promise<void> => {
    const storedToken = localStorage.getItem('access_token');
    if (storedToken && storedToken !== undefined) {
      // Get athlete
      const path = `${NetworkUrls.getAthlete}?access_token=${storedToken}`;
      const getAthleteResponse = await get({ path });
      if (getAthleteResponse && !athlete) {
        setAthlete(getAthleteResponse);
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

export { AuthProvider, AuthContext };
