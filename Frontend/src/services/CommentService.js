import ApiError from "./ApiError.js";
import ApiRequest from "./ApiRequest.js";
import ApiResponse from "./ApiResponse.js";

class CommentService {
  COMMENT_BASE_URL = "/api/v1/comments";

  async createComment(content, notesId) {
    const apiRequest = new ApiRequest(
      `${this.COMMENT_BASE_URL}/create-comment/${notesId}`
    );

    const response = await apiRequest.postRequest({ content });

    if (response instanceof ApiResponse && response.success) {
      return response;
    } else if (response instanceof ApiResponse) {
      return new ApiError(response.message);
    } else {
      return response;
    }
  }

  async editComment(commentId, content) {
    const apiRequest = new ApiRequest(
      `${this.COMMENT_BASE_URL}/edit-comment/${commentId}`
    );

    const response = await apiRequest.patchRequest({ content });

    if (response instanceof ApiResponse && response.success) {
      return response;
    } else if (response instanceof ApiResponse) {
      return new ApiError(response.message);
    } else {
      return response;
    }
  }

  async deleteComment(commentId) {
    const apiRequest = new ApiRequest(
      `${this.COMMENT_BASE_URL}/delete-comment/${commentId}`
    );

    const response = await apiRequest.deleteRequest();

    if (response instanceof ApiResponse && response.success) {
      return response;
    } else if (response instanceof ApiResponse) {
      return new ApiError(response.message);
    } else {
      return response;
    }
  }

  async getComments(notesId) {
    const apiRequest = new ApiRequest(
      `${this.COMMENT_BASE_URL}/get-comments/${notesId}`
    );

    const response = await apiRequest.getRequest();

    if (response instanceof ApiResponse && response.success) {
      return response;
    } else if (response instanceof ApiResponse) {
      return new ApiError(response.message);
    } else {
      return response;
    }
  }

  async getUserComments() {
    const apiRequest = new ApiRequest(
      `${this.COMMENT_BASE_URL}/get-user-comments`
    );

    const response = await apiRequest.getRequest();

    if (response instanceof ApiResponse && response.success) {
      return response;
    } else if (response instanceof ApiResponse) {
      return new ApiError(response.message);
    } else {
      return response;
    }
  }
}

export default new CommentService();
