export async function apiFetch(url, options = {}) {
    const token = localStorage.getItem("token");

    const headers = new Headers(options.headers);

    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    if (options.body && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }

    const response = await fetch(url, {
        ...options,
        headers,
    });

    if (response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        throw new Error("Authentication required");
    }

    if (response.status === 403) {
        throw new Error("You do not have permission");
    }

    if (!response.ok) {
        const message = await response.text();
        throw new Error(message || `Request failed: ${response.status}`);
    }

    if (response.status === 204) {
        return null;
    }

    const contentType = response.headers.get("Content-Type");

    if (contentType?.includes("application/json")) {
        return response.json();
    }

    return null;
}