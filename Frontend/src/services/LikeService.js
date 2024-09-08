import ApiError from "./ApiError.js";
import ApiRequest from "./ApiRequest.js";
import ApiResponse from "./ApiResponse.js";

class LikeService {
  LIKE_BASE_URL = "/api/v1/likes";

  async likeOrUnlikeNotes(notesId) {
    const apiRequest = new ApiRequest(`${this.LIKE_BASE_URL}/notes/${notesId}`);

    const response = await apiRequest.postRequest();

    if (response instanceof ApiResponse && response.success) {
      return response;
    } else if (response instanceof ApiResponse) {
      return new ApiError(response.message);
    } else {
      return response;
    }
  }
}

export default new LikeService();
