import { PostData } from '../Models/api';

interface BodyContentInterface {
  code?: string;
}

function isJson(response: Response): boolean {
  return /json/.test(response.headers.get('content-type') || '');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleCommonError(response: Response): Promise<any> {
  const isResponseJson = isJson(response);
  if (response.ok && isResponseJson) {
    return response.json();
  }
  const bodyContent: BodyContentInterface = isResponseJson
    ? await response.json()
    : {};

  // @todo set a real error handler
  switch (response.status) {
    case 400:
      bodyContent.code = 'ERRORS.PLOP';
      break;
    case 404:
      bodyContent.code = 'ERRORS.NOT_FOUND';
      break;
    default:
      break;
  }

  const error = new Error(bodyContent.code);
  throw error;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function post(data: PostData): Promise<any> {
  const request = new Request(data.path, {
    method: 'POST',
    body: data.body,
  });
  return fetch(request)
    .then(response => {
      return handleCommonError(response);
    })
    .catch(err => {
      return err;
    });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function get(data: PostData): Promise<any> {
  const request = new Request(data.path, {
    method: 'GET',
    body: data.body,
  });
  return fetch(request)
    .then(response => {
      return handleCommonError(response);
    })
    .catch(err => {
      return err;
    });
}
