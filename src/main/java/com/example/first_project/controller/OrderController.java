package com.example.first_project.controller;

import com.example.first_project.model.Reader;
import com.example.first_project.model.Book;
import com.example.first_project.model.Order;
import com.example.first_project.service.LibraryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final LibraryService libraryService;

    public OrderController(LibraryService libraryService) {
        this.libraryService = libraryService;
    }

    @GetMapping
    public List<Order> getOrders() {
        return libraryService.getOrders();
    }

    @GetMapping("/{id}")
    public Order getOrder(@PathVariable int id) {
        return libraryService.getOrders()
                .stream()
                .filter(o -> o.getId() == id)
                .findFirst()
                .orElse(null);
    }

    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        Book book = findBookById(order.getBook().getId());
        Reader reader = findReaderById(order.getReader().getId());

        order.setId(libraryService.getOrders().size() + 1);
        order.setBook(book);
        order.setReader(reader);

        libraryService.addOrder(order);
        return order;
    }

    @PutMapping("/{id}")
    public Order showEditForm(@PathVariable int id, @RequestBody Order order) {
        Book book = findBookById(order.getBook().getId());
        Reader reader = findReaderById(order.getReader().getId());

        libraryService.getOrders().removeIf(o -> o.getId() == id);

        order.setId(id);
        order.setBook(book);
        order.setReader(reader);
        order.setActive(order.getDateReturned() == null);
        return order;
    }

    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable int id) {
        libraryService.getOrders().removeIf(o -> o.getId() == id);
    }

    private Book findBookById(int id) {
        return libraryService.getBooks()
                .stream()
                .filter(b -> b.getId() == id)
                .findFirst()
                .orElse(null);
    }

    private Reader findReaderById(int id) {
        return libraryService.getReaders()
                .stream()
                .filter(r -> r.getId() == id)
                .findFirst()
                .orElse(null);
    }
}
