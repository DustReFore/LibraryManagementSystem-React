package com.example.first_project.controller;

import com.example.first_project.model.Author;
import com.example.first_project.model.Book;
import com.example.first_project.model.Category;
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
        return libraryService.getBookById(id);
    }

    @PostMapping
    public Book createBook(@RequestBody Book book) {
        Author author = libraryService.getAuthorById(book.getAuthor().getId());
        Category category = libraryService.getCategoryByName(book.getCategory().getName());

        book.setAuthor(author);
        book.setCategory(category);

        return libraryService.addBook(book);
    }

    @PutMapping("/{id}")
    public Book updateBook(@PathVariable Long id, @RequestBody Book book) {
        Author author = libraryService.getAuthorById(book.getAuthor().getId());
        Category category = libraryService.getCategoryByName(book.getCategory().getName());

        book.setId(id);
        book.setAuthor(author);
        book.setCategory(category);

        return libraryService.addBook(book);
    }

    @DeleteMapping("/{id}")
    public void deleteBook(@PathVariable Long id) {
        libraryService.deleteBook(id);
    }
}
