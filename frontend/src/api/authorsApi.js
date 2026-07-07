const API_URL = "/api/authors/";

export function getAuthors() {
    return fetch(API_URL).then((res) => res.json());
}