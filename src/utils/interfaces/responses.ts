export interface GenericSuccesfullResponse {
  responseMessage: String | undefined,
  // moreInfo: String
}

export interface GenericErrorResponse {
  errorMessage: String | undefined,
  // moreInfo: String
}

export interface GenericServiceResponse {
  httpStatus: Number,
  serverMessage: String,
  moreDetails: GenericSuccesfullResponse | GenericErrorResponse,
  responseBody: any,
  error: boolean,
  success: boolean
}

export interface GenericServiceErrorResponse {
  httpStatus: Number,
  serverMessage: String,
  errorMessage?: String | Array<any>,
  error: true
}

// internal requests

export interface IGenericInternalResponse {
  success: boolean
  error: boolean
  data: any
}

export interface IGenericExternalServiceResponse {
  httpStatus: number,
  serverMessage: string,
  moreDetails: string,
  responseBody: any,
  errorMessage?: string | Array<any>,
  error: boolean,
  success: boolean
}