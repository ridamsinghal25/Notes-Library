class ApiError {
  constructor(errorMessage, errorData, errorResponse, formError) {
    this.error = true;
    this.errorMessage = errorMessage;
    this.errorData = errorData;
    this.errorResponse = errorResponse;
    this.formError = formError || null;
  }
}

export default ApiError;
