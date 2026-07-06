const API_URL = "/api/books";

export function getBooks() {
    return fetch(API_URL).then((res) => res.json());
}

export function getBookById(id) {
    return fetch(`${API_URL}/${id}`).then((res) => res.json());
}

export function createBook(book) {
    return fetch(API_URL, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
    });
}

export function updateBook(id, book) {
    return fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
    });
}

export function deleteBook(id) {
    return fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
}