package com.example.first_project.controller;

import com.example.first_project.model.Reader;
import com.example.first_project.service.LibraryService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/readers")
public class ReaderController {
    private final LibraryService libraryService;

    public ReaderController(LibraryService libraryService) {
        this.libraryService = libraryService;
    }

    @GetMapping
    public List<Reader> getReaders() {
        return libraryService.getReaders();
    }

    @GetMapping("/{id}")
    public Reader getReader(@PathVariable int id) {
        return libraryService.getReaders()
                .stream()
                .filter(r -> r.getId() == id)
                .findFirst()
                .orElse(null);
    }

    @PostMapping
    public Reader createReader(@RequestBody Reader reader) {
        reader.setId(libraryService.getReaders().size() + 1);
        libraryService.addReader(reader);
        return reader;
    }

    @PutMapping("/{id}")
    public Reader updateReader(@PathVariable int id, @RequestBody Reader reader) {
        libraryService.getReaders().removeIf(r -> r.getId() == id);
        reader.setId(id);
        libraryService.addReader(reader);
        return reader;
    }

    @DeleteMapping("/{id}")
    public void deleteReader(@PathVariable int id) {
        libraryService.getReaders().removeIf(r -> r.getId() == id);
    }
}
