import ApiError from "./ApiError.js";
import ApiRequest from "./ApiRequest.js";
import ApiResponse from "./ApiResponse.js";

class CourseService {
  COURSE_BASE_URL = "/api/v1/courses";

  async createCourse(fields) {
    const apiRequest = new ApiRequest(`${this.COURSE_BASE_URL}/create-course`);

    const response = await apiRequest.postRequest(fields);

    if (response instanceof ApiResponse && response.success) {
      return response;
    } else if (response instanceof ApiResponse) {
      return new ApiError(response.message);
    } else {
      return response;
    }
  }

  async updateCourse(courseId, fields) {
    const apiRequest = new ApiRequest(
      `${this.COURSE_BASE_URL}/update-course/${courseId}`
    );

    const response = await apiRequest.patchRequest(fields);

    if (response instanceof ApiResponse && response.success) {
      return response;
    } else if (response instanceof ApiResponse) {
      return new ApiError(response.message);
    } else {
      return response;
    }
  }

  async deleteCourse(courseId, data) {
    const apiRequest = new ApiRequest(
      `${this.COURSE_BASE_URL}/delete-course/${courseId}`
    );

    const response = await apiRequest.deleteRequest(data);

    if (response instanceof ApiResponse && response.success) {
      return response;
    } else if (response instanceof ApiResponse) {
      return new ApiError(response.message);
    } else {
      return response;
    }
  }

  async getCourse() {
    const apiRequest = new ApiRequest(`${this.COURSE_BASE_URL}/get-courses`);

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

export default new CourseService();
