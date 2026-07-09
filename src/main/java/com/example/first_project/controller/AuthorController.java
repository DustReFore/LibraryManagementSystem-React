package com.example.first_project.controller;

import com.example.first_project.model.Author;
import com.example.first_project.service.LibraryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/authors")
public class AuthorController {
    private final LibraryService libraryService;

    public AuthorController(LibraryService libraryService) {
        this.libraryService = libraryService;
    }

    @GetMapping
    public List<Author> getAuthors() {
        return libraryService.getAuthors();
    }

    @GetMapping("/{id}")
    public Author getAuthor(@PathVariable Long id) {
        return libraryService.getAuthorById(id);
    }

    @PostMapping
    public Author createAuthor(@RequestBody Author author) {
        return libraryService.addAuthor(author);
    }

    @PutMapping("/{id}")
    public Author updateAuthor(@PathVariable Long id, @RequestBody Author author) {
        author.setId(id);
        return libraryService.addAuthor(author);
    }

    @DeleteMapping("/{id}")
    public void deleteAuthor(@PathVariable Long id) {
        libraryService.deleteAuthor(id);
    }
}
