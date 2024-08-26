import ApiError from "./ApiError.js";
import ApiRequest from "./ApiRequest.js";
import ApiResponse from "./ApiResponse.js";

class NotesService {
  NOTES_BASE_URL = "/api/v1/notes";

  async uploadNotes(fields) {
    const apiRequest = new ApiRequest(`${this.NOTES_BASE_URL}/upload-notes`);

    const formData = new FormData();
    formData.append("chapterNumber", fields.chapterNumber);
    formData.append("chapterName", fields.chapterName);
    formData.append("owner", fields.owner);
    formData.append("subject", fields.subject);
    formData.append("pdfFile", fields.pdfFile);

    const response = await apiRequest.postRequest(formData, {
      "Content-Type": "multipart/form-data",
    });

    if (response instanceof ApiResponse && response.success) {
      return response.data;
    } else if (response instanceof ApiResponse) {
      return new ApiError(response.message);
    } else {
      return response;
    }
  }

  async updateNotes(notesId, fields) {
    const apiRequest = new ApiRequest(
      `${this.NOTES_BASE_URL}/update-notes/${notesId}`
    );

    const formData = new FormData();
    formData.append("chapterNumber", fields.chapterNumber);
    formData.append("chapterName", fields.chapterName);
    formData.append("owner", fields.owner);
    formData.append("subject", fields.subject);
    formData.append("pdfFile", fields.pdfFile);

    const response = await apiRequest.patchRequest(formData, {
      "Content-Type": "multipart/form-data",
    });

    if (response instanceof ApiResponse && response.success) {
      return response.data;
    } else if (response instanceof ApiResponse) {
      return new ApiError(response.message);
    } else {
      return response;
    }
  }

  async deleteNotes(notesId) {
    const apiRequest = new ApiRequest(
      `${this.NOTES_BASE_URL}/delete-notes/${notesId}`
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

  async getNotesBySubject(subject) {
    const apiRequest = new ApiRequest(`${this.NOTES_BASE_URL}/get-notes`);

    const response = await apiRequest.postRequest(subject);

    if (response instanceof ApiResponse && response.success) {
      return response.data;
    } else if (response instanceof ApiResponse) {
      return new ApiError(response.message);
    } else {
      return response;
    }
  }
}

export default new NotesService();
