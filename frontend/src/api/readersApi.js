import { apiFetch } from "./apiClient.js";

const API_URL = "/api/readers";

export function getReaders() {
    return apiFetch(API_URL);
}

export function getReaderById(id) {
    return apiFetch(`${API_URL}/${id}`);
}

export function createReader(reader) {
    return apiFetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(reader),
    });
}

export function updateReader(id, reader) {
    return apiFetch(`${API_URL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(reader),
    });
}

export function deleteReader(id) {
    return apiFetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
}