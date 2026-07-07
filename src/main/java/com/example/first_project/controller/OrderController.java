package com.example.first_project.controller;

import com.example.first_project.model.Reader;
import com.example.first_project.model.Book;
import com.example.first_project.model.Order;
import com.example.first_project.service.LibraryService;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/orders")
public class OrderController {
    private final LibraryService libraryService;

    public OrderController(LibraryService libraryService) {
        this.libraryService = libraryService;
    }

    @GetMapping()
    public String listOrders(Model model) {
        model.addAttribute("orders", libraryService.getOrders());
        return "orders";
    }

    @GetMapping("/add")
    public String showAddForm(Model model) {
        Order order = new Order();
        order.setBook(new Book());
        order.setReader(new Reader());

        model.addAttribute("order", order);
        model.addAttribute("books", libraryService.getBooks());
        model.addAttribute("readers", libraryService.getReaders());
        model.addAttribute("formAction", "/orders/add");
        model.addAttribute("formTitle", "Add order");
        model.addAttribute("submitText", "Save order");
        return "order_form";
    }

    @PostMapping("/add")
    public String addOrder(@ModelAttribute Order order) {
        Book book = libraryService.getBooks().stream()
                .filter(b -> b.getId() == order.getBook().getId())
                .findFirst()
                .orElse(null);

        Reader reader = libraryService.getReaders().stream()
                .filter(r -> r.getId() == order.getReader().getId())
                .findFirst()
                .orElse(null);

        order.setId(libraryService.getOrders().size() + 1);
        order.setBook(book);
        order.setReader(reader);
        order.setDateIssued(LocalDate.now());

        libraryService.addOrder(order);
        return "redirect:/orders";
    }

    @GetMapping("/edit/{id}")
    public String showEditForm(@PathVariable int id, Model model) {
        Order order = libraryService.getOrders()
                .stream()
                .filter(o -> o.getId() == id)
                .findFirst()
                .orElse(null);

        model.addAttribute("order", order);
        model.addAttribute("books", libraryService.getBooks());
        model.addAttribute("readers", libraryService.getReaders());
        model.addAttribute("formAction", "/orders/edit/" + id);
        model.addAttribute("formTitle", "Edit order");
        model.addAttribute("submitText", "Save changes");
        return "order_form";
    }

    @PostMapping("/edit/{id}")
    public String editOrder(@PathVariable int id, @ModelAttribute Order order) {
        Book book = libraryService.getBooks().stream()
                .filter(b -> b.getId() == order.getBook().getId())
                .findFirst()
                .orElse(null);

        Reader reader = libraryService.getReaders().stream()
                .filter(r -> r.getId() == order.getReader().getId())
                .findFirst()
                .orElse(null);

        libraryService.getOrders().removeIf(o -> o.getId() == id);

        order.setId(id);
        order.setBook(book);
        order.setReader(reader);

        libraryService.addOrder(order);

        return "redirect:/orders";
    }

    @GetMapping("delete/{id}")
    public String deleteOrder(@PathVariable int id) {
        libraryService.getOrders().removeIf(o -> o.getId() == id);
        return "redirect:/orders";
    }
}
