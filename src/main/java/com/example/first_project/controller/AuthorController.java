package com.example.first_project.controller;

import com.example.first_project.model.Author;
import com.example.first_project.service.LibraryService;
import org.springframework.ui.Model;
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

    // Создание автора
    @GetMapping("/add")
    public String showAddAuthor(Model model) {
        model.addAttribute("author", new Author());
        model.addAttribute("formAction", "/authors/add");
        model.addAttribute("formTitle", "Add author");
        model.addAttribute("submitText", "Save author");
        return "author_form";
    }

    @PostMapping("/add")
    public String addAuthor(@ModelAttribute Author author) {
        author.setId(libraryService.getAuthors().size() + 1);
        libraryService.getAuthors().add(author);
        return "redirect:/authors";
    }

    // Редактирование автора
    @GetMapping("/edit/{id}")
    public String showEditForm(@PathVariable int id, Model model) {
        Author author = libraryService.getAuthors().stream().filter(a -> a.getId() == id).findFirst().orElse(null);
        model.addAttribute("author", author);
        model.addAttribute("formAction", "/authors/edit/" + id);
        model.addAttribute("formTitle", "Edit author");
        model.addAttribute("submitText", "Save changes");
        return "author_form";
    }

    @PostMapping("/edit/{id}")
    public String editAuthor(@PathVariable int id, @ModelAttribute Author updatedAuthor) {
        libraryService.getAuthors().removeIf(a -> a.getId() == id);
        updatedAuthor.setId(id);
        libraryService.getAuthors().add(updatedAuthor);
        return "redirect:/authors";
    }

    // Удаление автора
    @GetMapping("/delete/{id}")
    public String deleteAuthor(@PathVariable int id) {
        libraryService.getAuthors().removeIf(a -> a.getId() == id);
        return "redirect:/authors";
    }
}
