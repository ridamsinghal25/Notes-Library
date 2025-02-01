import ApiError from "../services/ApiError.js";
import ApiResponse from "../services/ApiResponse.js";

export const asyncHandler = async (func) => {
  return Promise.resolve(func())
    .then((data) => {
      const responseData = data.data;

      return new ApiResponse(
        responseData.statusCode,
        responseData.data,
        responseData.message,
        responseData.success
      );
    })
    .catch((error) => {
      if (
        (error?.status === 422 || error?.response?.status === 422) &&
        error?.response?.data?.errors.length > 0
      ) {
        const formErrorMessage = Object.values(
          error?.response?.data?.errors?.[0]
        );

        return new ApiError(
          error.message,
          error,
          error?.response?.data,
          formErrorMessage[0]
        );
      }

      return new ApiError(error.message, error, error?.response?.data);
    });
};
