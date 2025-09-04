const BASE_URL = "http://localhost:8000/api";
//const BASE_URL = "https://api-noeltanada.alphadds.com/api";

async function request(endpoint, { method = "GET", body, headers = {} } = {}) {
  const token = localStorage.getItem("token");
  const options = {
    method,
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
  };

  if (body) {
    if (body instanceof FormData) {
      // Don't set Content-Type for FormData, let the browser handle it
      options.body = body;
    } else {
      options.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(body);
    }
  }
  const res = await fetch(`${BASE_URL}${endpoint}`, options);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "API Error");
  }
  return data;
}

export const api = {
  get: (endpoint, options) => request(endpoint, { ...options, method: "GET" }),
  post: (endpoint, body, options) =>
    request(endpoint, { ...options, method: "POST", body }),
  put: (endpoint, body, options) =>
    request(endpoint, { ...options, method: "PUT", body }),
  delete: (endpoint, options) =>
    request(endpoint, { ...options, method: "DELETE" }),
};

export default api;
