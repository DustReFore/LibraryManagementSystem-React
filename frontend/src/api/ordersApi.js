import { apiFetch } from "./apiClient.js";

const API_URL = "/api/orders";

export function getOrders() {
    return apiFetch(API_URL);
}

export function getOrderById(id) {
    return apiFetch(`${API_URL}/${id}`);
}

export function createOrder(order) {
    return apiFetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(order),
    });
}

export function updateOrder(id, order) {
    return apiFetch(`${API_URL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(order),
    });
}

export function deleteOrder(id) {
    return apiFetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
}