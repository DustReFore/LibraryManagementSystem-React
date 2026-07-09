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
    public Reader getReader(@PathVariable Long id) {
        return libraryService.getReaderById(id);
    }

    @PostMapping
    public Reader createReader(@RequestBody Reader reader) {
        return libraryService.addReader(reader);
    }

    @PutMapping("/{id}")
    public Reader updateReader(@PathVariable Long id, @RequestBody Reader reader) {
        reader.setId(id);
        return libraryService.addReader(reader);
    }

    @DeleteMapping("/{id}")
    public void deleteReader(@PathVariable Long id) {
        libraryService.deleteReader(id);
    }
}
