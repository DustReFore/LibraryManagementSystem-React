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
    public Order getOrder(@PathVariable Long id) {
        return libraryService.getOrderById(id);
    }

    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        Book book = libraryService.getBookById(order.getBook().getId());
        Reader reader = libraryService.getReaderById(order.getReader().getId());

        order.setBook(book);
        order.setReader(reader);
        order.setActive(order.getDateReturned() == null);

        return libraryService.addOrder(order);
    }

    @PutMapping("/{id}")
    public Order updateOrder(@PathVariable Long id, @RequestBody Order order) {
        Book book = libraryService.getBookById(order.getBook().getId());
        Reader reader = libraryService.getReaderById(order.getReader().getId());

        order.setId(id);
        order.setBook(book);
        order.setReader(reader);
        order.setActive(order.getDateReturned() == null);

        return libraryService.addOrder(order);
    }

    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable Long id) {
        libraryService.deleteOrder(id);
    }
}
