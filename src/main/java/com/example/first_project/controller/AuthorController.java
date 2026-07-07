package com.example.first_project.controller;

import com.example.first_project.model.Author;
import com.example.first_project.service.LibraryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/authors")
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
    public Author getAuthor(@PathVariable int id) {
        return libraryService
                .getAuthors()
                .stream()
                .filter(a -> a.getId() == id)
                .findFirst()
                .orElse(null);
    }

    @PostMapping
    public Author createAuthor(@RequestBody Author author) {
        author.setId(libraryService.getAuthors().size() + 1);
        libraryService.addAuthor(author);
        return author;
    }

    @PutMapping("/{id}")
    public Author updateAuthor(@PathVariable int id, @RequestBody Author author) {
        author.setId(id);
        libraryService.getAuthors().removeIf(a -> a.getId() == id);
        libraryService.addAuthor(author);
        return author;
    }

    @DeleteMapping("/{id}")
    public void deleteAuthor(@PathVariable int id) {
        libraryService.getAuthors().removeIf(a -> a.getId() == id);
    }
}
