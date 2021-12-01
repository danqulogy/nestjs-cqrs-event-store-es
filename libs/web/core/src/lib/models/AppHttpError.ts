export interface AppHttpError {
  errorMessage: string
  status?: number
  createdBy?: any
}

export class AppErrorFactory {
  static create(message: string, status?: number, errors?: any): AppHttpError {
    return { errorMessage: message, status }
  }
}

export interface UiError {
  message: string
  details: { subheading: string; items: string[] }
}
