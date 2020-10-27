import { IDXOptional } from "idx";

export type PostData = {
    path: string;
    body?: string | URLSearchParams | Blob | ArrayBufferView | ArrayBuffer | FormData | ReadableStream<Uint8Array> | null | undefined,
    options?: OptionsData;
}

export type HeadersData = {
  authorization?: string;
  "Auth-Email"?: string;
  "Auth-Password"?: string;
};

export type ErrorData = {
  name?: string;
  status?: string;
  message?: string;
  statusCode?: IDXOptional<string>;
  data?: IDXOptional<ErrorData>;
  headers?: IDXOptional<string>;
  type?: IDXOptional<string>;
  req?: { path: string; body: Record<string, unknown>; options: Record<string, unknown> };
  errorType?: string;
};

export type ErrorResponse = {
  response: ErrorData;
  code: number | string;
};

export type OptionsData = {
  headers?: Record<string, unknown>;
};
