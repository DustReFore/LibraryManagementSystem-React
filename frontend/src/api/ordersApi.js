const API_URL = "/api/orders";

export function getOrders() {
    return fetch(API_URL).then((res) => res.json());
}

export function getOrderById(id) {
    return fetch(`${API_URL}/${id}`).then((res) => res.json());
}

export function createOrder(order) {
    return fetch(API_URL, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
    });
}

export function updateOrder(id, order) {
    return fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
    });
}

export function deleteOrder(id) {
    return fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
}