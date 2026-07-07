package com.example.first_project.controller;

import com.example.first_project.model.Book;
import com.example.first_project.service.LibraryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {
    private final LibraryService libraryService;

    public BookController(LibraryService libraryService) {
        this.libraryService = libraryService;
    }

    @GetMapping
    public List<Book> getBooks() {
        return libraryService.getBooks();
    }

    @GetMapping("/{id}")
    public Book getBook(@PathVariable int id) {
        return libraryService.getBooks()
                .stream()
                .filter(b -> b.getId() == id)
                .findFirst()
                .orElse(null);
    }

    @PostMapping
    public Book createBook(@RequestBody Book book) {
        book.setId(libraryService.getBooks().size() + 1);
        libraryService.addBook(book);
        return book;
    }

    @PutMapping("/{id}")
    public Book updateBook(@PathVariable int id, @RequestBody Book book) {
        book.setId(id);
        libraryService.getBooks().removeIf(b -> b.getId() == id);
        libraryService.addBook(book);
        return book;
    }

    @DeleteMapping("/{id}")
    public void deleteBook(@PathVariable int id) {
        libraryService.getBooks().removeIf(b -> b.getId() == id);
    }
}
