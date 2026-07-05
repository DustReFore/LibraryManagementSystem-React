package com.example.first_project.controller;

import com.example.first_project.model.Author;
import com.example.first_project.model.Book;
import com.example.first_project.service.LibraryService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/books")
public class BookController {
    private final LibraryService libraryService;

    public BookController(LibraryService libraryService) {
        this.libraryService = libraryService;
    }

    @GetMapping
    public String listBooks(Model model) {
        model.addAttribute("books", libraryService.getBooks());
        return "books";
    }

    @GetMapping("/add")
    public String showAddForm(Model model) {
        model.addAttribute("book", new Book());
        model.addAttribute("authors", libraryService.getAuthors());
        model.addAttribute("formAction", "/books/add");
        model.addAttribute("formTitle", "Add book");
        model.addAttribute("submitText", "Save book");
        return "book_form";
    }

    @PostMapping("/add")
    public String addBook(@ModelAttribute("book") Book book) {
        // найти автора по id
        Author author = libraryService.getAuthors()
                .stream()
                .filter(a -> a.getId() == book.getAuthor().getId())
                .findFirst()
                .orElse(null);

        book.setAuthor(author);
        book.setId(libraryService.getBooks().size() + 1);
        libraryService.addBook(book);
        return "redirect:/books";
    }

    @GetMapping("/edit/{id}")
    public String showEditForm(@PathVariable int id, Model model) {
        Book book = libraryService.getBooks().stream().filter(b -> b.getId() == id).findFirst().orElse(null);
        model.addAttribute("book", book);
        model.addAttribute("authors", libraryService.getAuthors());
        model.addAttribute("formAction", "/books/edit/" + id);
        model.addAttribute("formTitle", "Edit book");
        model.addAttribute("submitText", "Save changes");
        return "book_form";
    }

    @PostMapping("/edit/{id}")
    public String editBook(@PathVariable int id, @ModelAttribute("book") Book book) {
        Author author = libraryService.getAuthors()
                .stream()
                .filter(a -> a.getId() == book.getAuthor().getId())
                .findFirst()
                .orElse(null);

        book.setAuthor(author);
        book.setId(id);
        libraryService.getBooks().removeIf(b -> b.getId() == id);
        libraryService.addBook(book);
        return "redirect:/books";
    }

    @GetMapping("/delete/{id}")
    public String deleteBook(@PathVariable int id) {
        libraryService.getBooks().removeIf(b -> b.getId() == id);
        return "redirect:/books";
    }
}
