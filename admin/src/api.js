const TOKEN = "surfsync_admin_token";
const EMAIL = "surfsync_admin_email";
const ROLE = "surfsync_admin_role";
const BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:4000";

export function getToken() {
  return localStorage.getItem(TOKEN);
}

export function setToken(token) {
  if (token) localStorage.setItem(TOKEN, token);
  else {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(ROLE);
  }
}

export function getAdminRole() {
  return localStorage.getItem(ROLE) || "manager";
}

export function setAdminRole(role) {
  if (role) localStorage.setItem(ROLE, role);
  else localStorage.removeItem(ROLE);
}

export function getAdminEmail() {
  return localStorage.getItem(EMAIL) || "";
}

export function setAdminEmail(email) {
  if (email) localStorage.setItem(EMAIL, email);
}

async function request(path, options) {
  try {
    return await fetch(`${BASE}${path}`, options);
  } catch {
    throw new Error("Could not reach the server. Make sure the backend is running.");
  }
}

export async function api(path, { method = "GET", body } = {}) {
  const headers = {};
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  let payload;
  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
    payload = JSON.stringify(body);
  }

  const response = await request(path, { method, headers, body: payload });
  const data = await response.json().catch(() => ({}));
  if (response.status === 401) {
    setToken("");
    const error = new Error(data.error || "Please sign in again.");
    error.status = 401;
    throw error;
  }
  if (!response.ok) throw new Error(data.error || "Request failed.");
  return data;
}

export async function downloadResume(id, filename) {
  const response = await request(`/api/admin/applications/${id}/resume`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (response.status === 401) {
    setToken("");
    const error = new Error("Please sign in again.");
    error.status = 401;
    throw error;
  }
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || "Could not download the resume.");
  }
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename || "resume.pdf";
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
