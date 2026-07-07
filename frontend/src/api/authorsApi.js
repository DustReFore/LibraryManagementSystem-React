const API_URL = "/api/authors";

export function getAuthors() {
    return fetch(API_URL).then((res) => res.json());
}

export function getAuthorById(id) {
    return fetch(`${API_URL}/${id}`).then((res) => res.json());
}

export function createAuthor(author) {
    return fetch(API_URL, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(author),
    });
}

export function updateAuthor(id, author) {
    return fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(author),
    });
}

export function deleteAuthor(id) {
    return fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
}