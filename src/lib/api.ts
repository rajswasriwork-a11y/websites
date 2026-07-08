export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> | undefined),
  };

  const csrfToken = typeof window !== "undefined" ? sessionStorage.getItem("csrfToken") : null;
  if (csrfToken) {
    headers["x-csrf-token"] = csrfToken;
  }

  const response = await fetch(path, {
    ...options,
    headers,
    credentials: "include",
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || "Request failed");
  }

  return payload as T;
}

export async function getCsrfToken() {
  const response = await fetch("/api/auth/csrf", { credentials: "include" });
  const payload = await response.json();
  if (payload.csrfToken) {
    sessionStorage.setItem("csrfToken", payload.csrfToken);
  }
  return payload.csrfToken as string | undefined;
}

export async function getCurrentUser() {
  return request<{ user: { email: string; role: string } | null }>('/api/auth/me');
}

export async function loginAdmin(email: string, password: string) {
  await getCsrfToken();
  return request<{ user: { email: string; role: string } }>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function logoutAdmin() {
  return request('/api/auth/logout', { method: 'POST' });
}

export async function fetchPosts(includeAll = false) {
  const query = includeAll ? '?include=all' : '';
  return request<any[]>(`/api/posts${query}`);
}

export async function fetchPost(slug: string) {
  return request<any>(`/api/posts/${slug}`);
}

export async function createPost(payload: Record<string, unknown>) {
  return request<any>('/api/posts', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updatePost(id: string, payload: Record<string, unknown>) {
  return request<any>(`/api/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export async function publishPost(id: string) {
  return request<any>(`/api/posts/${id}/publish`, { method: 'POST' });
}

export async function unpublishPost(id: string) {
  return request<any>(`/api/posts/${id}/unpublish`, { method: 'POST' });
}

export async function deletePost(id: string) {
  return request<any>(`/api/posts/${id}`, { method: 'DELETE' });
}

export async function duplicatePost(id: string) {
  return request<any>(`/api/posts/${id}/duplicate`, { method: 'POST' });
}

export async function fetchCategories() {
  return request<any[]>('/api/categories');
}

export async function createCategory(payload: Record<string, unknown>) {
  return request<any>('/api/categories', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updateCategory(id: string, payload: Record<string, unknown>) {
  return request<any>(`/api/categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export async function deleteCategory(id: string) {
  return request<any>(`/api/categories/${id}`, { method: 'DELETE' });
}

export async function fetchTags() {
  return request<any[]>('/api/tags');
}

export async function createTag(payload: Record<string, unknown>) {
  return request<any>('/api/tags', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function deleteTag(id: string) {
  return request<any>(`/api/tags/${id}`, { method: 'DELETE' });
}

export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append('image', file);
  const csrfToken = sessionStorage.getItem('csrfToken');
  const response = await fetch('/api/media/upload', {
    method: 'POST',
    body: formData,
    credentials: 'include',
    headers: csrfToken ? { 'x-csrf-token': csrfToken } : {},
  });
  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload.error || 'Upload failed');
  }
  return payload;
}

export async function fetchSettings() {
  return request<any>('/api/settings');
}

export async function updateSettings(payload: Record<string, unknown>) {
  return request<any>('/api/settings', {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export async function searchPosts(query: string, category?: string, tag?: string) {
  const params = new URLSearchParams({ q: query });
  if (category) params.set('category', category);
  if (tag) params.set('tag', tag);
  return request<any[]>(`/api/search?${params.toString()}`);
}
