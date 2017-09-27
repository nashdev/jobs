import { SubmissionError } from "redux-form";

export default class ApiResource {
  constructor(baseurl) {
    this.baseUrl = baseurl;
  }
  static forge(baseurl) {
    return new ApiResource(baseurl);
  }

  get fetchOptions() {
    return {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${this.authToken}`
      }
    };
  }

  setAuthToken(token) {
    if (token) {
      this.authToken = token;
    }

    return this;
  }

  parseErrors(errors) {
    return errors.reduce((obj, e) => {
      obj[e.param] = e.msg;
      return obj;
    }, {});
  }
  async request(url, options = {}) {
    try {
      const fetchOptions = {
        ...this.fetchOptions,
        ...options
      };
      const res = await fetch(`${this.baseUrl}${url}`, fetchOptions);

      const json = await res.json();
      if (json.errors) {
        throw new SubmissionError(this.parseErrors(json.errors));
      }
      return json;
    } catch (error) {
      throw error;
    }
  }
  async create(payload) {
    const options = {
      method: "POST",
      body: JSON.stringify(payload)
    };
    return await this.request("", options);
  }
  async read(id) {
    return await this.request(`/${id}`);
  }
  async update(id, payload) {
    const options = {
      method: "POST",
      body: JSON.stringify(payload)
    };

    return await this.request(`/${id}`, options);
  }
  async delete(id) {
    const options = {
      method: "DELETE"
    };

    return await this.request(`/${id}`, options);
  }
  async paginate(page, pageSize) {
    return await this.request(`?page=${page}&pageSize=${pageSize}`);
  }
}
