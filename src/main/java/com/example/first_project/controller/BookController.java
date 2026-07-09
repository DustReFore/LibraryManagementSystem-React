package com.example.first_project.controller;

import com.example.first_project.model.Author;
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
    public Book getBook(@PathVariable Long id) {
        return libraryService.getBooks()
                .stream()
                .filter(b -> b.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    @PostMapping
    public Book createBook(@RequestBody Book book) {
        Author author = libraryService.getAuthors()
                .stream()
                .filter(a -> a.getId().equals(book.getAuthor().getId()))
                .findFirst()
                .orElse(null);
        book.setAuthor(author);
        book.setId((long) (libraryService.getBooks().size() + 1));
        libraryService.addBook(book);
        return book;
    }

    @PutMapping("/{id}")
    public Book updateBook(@PathVariable Long id, @RequestBody Book book) {
        Author author = libraryService.getAuthors()
                .stream()
                .filter(a -> a.getId().equals(book.getAuthor().getId()))
                .findFirst()
                .orElse(null);
        book.setAuthor(author);
        book.setId(id);
        libraryService.getBooks().removeIf(b -> b.getId().equals(id));
        libraryService.addBook(book);
        return book;
    }

    @DeleteMapping("/{id}")
    public void deleteBook(@PathVariable Long id) {
        libraryService.getBooks().removeIf(b -> b.getId().equals(id));
    }
}
