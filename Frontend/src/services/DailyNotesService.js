import ApiError from "./ApiError.js";
import ApiRequest from "./ApiRequest.js";
import ApiResponse from "./ApiResponse.js";

class DailyNotesService {
  DAILYNOTES_BASE_URL = "/api/v1/daily-notes";

  async createNotes(fields) {
    const apiRequest = new ApiRequest(
      `${this.DAILYNOTES_BASE_URL}/create-notes`
    );

    const formData = new FormData();
    formData.append("chapterNumber", fields.chapterNumber);
    formData.append("chapterName", fields.chapterName);
    formData.append("subject", fields.subject);

    fields.files.forEach((file) => {
      formData.append("notesFiles", file);
    });

    const response = await apiRequest.postRequest(formData, {
      "Content-Type": "multipart/form-data",
    });

    if (response instanceof ApiResponse && response.success) {
      return response;
    } else if (response instanceof ApiResponse) {
      return new ApiError(response.message);
    } else {
      return response;
    }
  }

  async updateNotes(dailyNotesId, fields) {
    const apiRequest = new ApiRequest(
      `${this.DAILYNOTES_BASE_URL}/update-notes/${dailyNotesId}`
    );

    const response = await apiRequest.patchRequest({
      chapterNumber: fields.chapterNumber,
      chapterName: fields.chapterName,
      subject: fields.subject,
    });

    if (response instanceof ApiResponse && response.success) {
      return response;
    } else if (response instanceof ApiResponse) {
      return new ApiError(response.message);
    } else {
      return response;
    }
  }

  async deleteChapter(fields) {
    const apiRequest = new ApiRequest(
      `${this.DAILYNOTES_BASE_URL}/delete-chapter`
    );

    const response = await apiRequest.deleteRequest({
      chapterNumber: fields.chapterNumber,
      chapterName: fields.chapterName,
      subject: fields.subject,
    });

    if (response instanceof ApiResponse && response.success) {
      return response;
    } else if (response instanceof ApiResponse) {
      return new ApiError(response.message);
    } else {
      return response;
    }
  }

  async deleteNotes(dailyNotesId) {
    const apiRequest = new ApiRequest(
      `${this.DAILYNOTES_BASE_URL}/delete-notes/${dailyNotesId}`
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

  async getNotes(fields) {
    const apiRequest = new ApiRequest(`${this.DAILYNOTES_BASE_URL}/get-notes`);

    const response = await apiRequest.getRequest({
      chapterName: fields.chapterName,
      subject: fields.subject,
    });

    if (response instanceof ApiResponse && response.success) {
      return response;
    } else if (response instanceof ApiResponse) {
      return new ApiError(response.message);
    } else {
      return response;
    }
  }

  async updateNotesPdfFile(dailyNotesId, fields) {
    const apiRequest = new ApiRequest(
      `${this.DAILYNOTES_BASE_URL}/update-files/${dailyNotesId}`
    );

    const formData = new FormData();
    formData.append("subject", fields.subject);

    fields.files.forEach((file) => {
      formData.append("notesFiles", file);
    });

    const response = await apiRequest.patchRequest(formData, {
      "Content-Type": "multipart/form-data",
    });

    if (response instanceof ApiResponse && response.success) {
      return response;
    } else if (response instanceof ApiResponse) {
      return new ApiError(response.message);
    } else {
      return response;
    }
  }
}

export default new DailyNotesService();
