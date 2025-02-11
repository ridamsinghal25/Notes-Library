import axios from "axios";
import { asyncHandler } from "../utils/asyncHandler.js";

class ApiRequest {
  constructor(url) {
    this.url = url;
  }

  async getRequest(queryParams = {}, headers = {}) {
    return await asyncHandler(() =>
      axios.get(this.url, {
        params: queryParams,
        headers: headers,
      })
    );
  }

  async postRequest(body, headers = {}, config = { timeout: 120000 }) {
    return await asyncHandler(() =>
      axios.post(this.url, body, {
        headers: headers,
        timeout: config?.timeout,
      })
    );
  }

  async putRequest(body, headers = {}) {
    return await asyncHandler(() =>
      axios.put(this.url, body, { headers: headers })
    );
  }

  async deleteRequest(body, headers = {}) {
    return await asyncHandler(() =>
      axios.delete(this.url, {
        data: body,
        headers: headers,
      })
    );
  }

  async patchRequest(body, headers = {}, config = { timeout: 120000 }) {
    return await asyncHandler(() =>
      axios.patch(this.url, body, {
        headers: headers,
        timeout: config?.timeout,
      })
    );
  }
}

export default ApiRequest;
