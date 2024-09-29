import ApiError from "./ApiError.js";
import ApiRequest from "./ApiRequest.js";
import ApiResponse from "./ApiResponse.js";

class AuthService {
  USER_BASE_URL = "/api/v1/users";

  async loginService(email, password) {
    const apiRequest = new ApiRequest(`${this.USER_BASE_URL}/login`);

    const response = await apiRequest.postRequest({ email, password });

    if (response instanceof ApiResponse && response.success) {
      return response;
    } else if (response instanceof ApiResponse) {
      return new ApiError(response.message);
    } else {
      return response;
    }
  }

  async getCurrentUser(queryParams = {}, headers = {}) {
    const apiRequest = new ApiRequest(`${this.USER_BASE_URL}/current-user`);

    const response = await apiRequest.getRequest(queryParams, headers);

    if (response instanceof ApiResponse && response.success) {
      return response;
    } else if (response instanceof ApiResponse) {
      return new ApiError(response.message);
    } else {
      return response;
    }
  }

  async logoutService() {
    const apiRequest = new ApiRequest(`${this.USER_BASE_URL}/logout`);

    const response = await apiRequest.postRequest();

    if (response instanceof ApiResponse && response.success) {
      return response;
    } else if (response instanceof ApiResponse) {
      return new ApiError(response.message);
    } else {
      return response;
    }
  }

  async signupService(fields) {
    const apiRequest = new ApiRequest(`${this.USER_BASE_URL}/register`);

    const response = await apiRequest.postRequest({
      fullName: fields.fullName,
      email: fields.email,
      password: fields.password,
      rollNumber: fields.rollNumber,
      courseName: fields.courseName,
      semester: fields.semester,
    });

    if (response instanceof ApiResponse && response.success) {
      return response;
    } else if (response instanceof ApiResponse) {
      return new ApiError(response.message);
    } else {
      return response;
    }
  }

  async changePassword(fields) {
    const apiRequest = new ApiRequest(`${this.USER_BASE_URL}/change-password`);

    const response = await apiRequest.postRequest({
      oldPassword: fields.oldPassword,
      newPassword: fields.newPassword,
    });

    if (response instanceof ApiResponse && response.success) {
      return true;
    } else if (response instanceof ApiResponse) {
      return new ApiError(response.message);
    } else {
      return response;
    }
  }

  async forgotPassword(fields) {
    const apiRequest = new ApiRequest(`${this.USER_BASE_URL}/forgot-password`);

    const response = await apiRequest.postRequest({ email: fields.email });

    if (response instanceof ApiResponse && response.success) {
      return response;
    } else if (response instanceof ApiResponse) {
      return new ApiError(response.message);
    } else {
      return response;
    }
  }

  async resetForgottenPassword(resetCode, newPassword) {
    const apiRequest = new ApiRequest(`${this.USER_BASE_URL}/reset-password`);

    const response = await apiRequest.postRequest({ resetCode, newPassword });

    if (response instanceof ApiResponse && response.success) {
      return response;
    } else if (response instanceof ApiResponse) {
      return new ApiError(response.message);
    } else {
      return response;
    }
  }

  async verifyUser(verifyCode) {
    const apiRequest = new ApiRequest(`${this.USER_BASE_URL}/verify-email`);

    const response = await apiRequest.postRequest(verifyCode);

    if (response instanceof ApiResponse && response.success) {
      return response;
    } else if (response instanceof ApiResponse) {
      return new ApiError(response.message);
    } else {
      return response;
    }
  }

  async refreshAccessToken() {
    const apiRequest = new ApiRequest(`${this.USER_BASE_URL}/refresh-token`);

    const response = await apiRequest.postRequest({});

    if (response instanceof ApiResponse && response.success) {
      return response;
    } else if (response instanceof ApiResponse) {
      return new ApiError(response.message);
    } else {
      return response;
    }
  }

  async resendVerificationEmail(email) {
    const apiRequest = new ApiRequest(`${this.USER_BASE_URL}/resend-email`);

    const response = await apiRequest.postRequest(email);

    if (response instanceof ApiResponse && response.success) {
      return response;
    } else if (response instanceof ApiResponse) {
      return new ApiError(response.message);
    } else {
      return response;
    }
  }

  async updateCourseByUser(semester) {
    const apiRequest = new ApiRequest(`${this.USER_BASE_URL}/update-course`);

    const response = await apiRequest.postRequest({ semester });

    if (response instanceof ApiResponse && response.success) {
      return response;
    } else if (response instanceof ApiResponse) {
      return new ApiError(response.message);
    } else {
      return response;
    }
  }

  async verifyRollNumber(rollNumber) {
    const apiRequest = new ApiRequest(
      `${this.USER_BASE_URL}/verify-rollnumber`
    );

    const response = await apiRequest.postRequest({ rollNumber });

    if (response instanceof ApiResponse && response.success) {
      return response;
    } else if (response instanceof ApiResponse) {
      return new ApiError(response.message);
    } else {
      return response;
    }
  }

  async updateUserAvatar(avatar) {
    const apiRequest = new ApiRequest(`${this.USER_BASE_URL}/update-avatar`);

    const formData = new FormData();
    formData.append("avatar", avatar);

    const response = await apiRequest.patchRequest(formData);

    if (response instanceof ApiResponse && response.success) {
      return response;
    } else if (response instanceof ApiResponse) {
      return new ApiError(response.message);
    } else {
      return response;
    }
  }
}

export default new AuthService();
