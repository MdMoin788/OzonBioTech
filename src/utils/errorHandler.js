
export const ErrorHandler = class extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
    // this => the error object itself which is created using errorHandler constructor
    // this.constructor => Will tells the error where occured 
    Error.captureStackTrace(this, this.constructor)
  }


}

