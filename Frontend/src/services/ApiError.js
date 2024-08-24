class ApiError {
  constructor(errorMessage, errorData, errorResponse) {
    this.error = true;
    this.errorMessage = errorMessage;
    this.errorData = errorData;
    this.errorResponse = errorResponse;
  }
}

export default ApiError;
