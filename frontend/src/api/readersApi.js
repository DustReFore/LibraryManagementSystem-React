const API_URL = "/api/readers";

export function getReaders() {
    return fetch(API_URL).then((res) => res.json());
}

export function getReaderById(id) {
    return fetch(`${API_URL}/${id}`).then((res) => res.json());
}

export function createReader(reader) {
    return fetch(API_URL, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reader),
    });
}

export function updateReader(id, reader) {
    return fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reader),
    });
}

export function deleteReader(id) {
    return fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
}