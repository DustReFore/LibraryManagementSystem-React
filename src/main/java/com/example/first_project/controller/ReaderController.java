package com.example.first_project.controller;

import com.example.first_project.model.Reader;
import com.example.first_project.model.Order;
import com.example.first_project.service.LibraryService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/readers")
public class ReaderController {
    private LibraryService libraryService;

    public ReaderController(LibraryService libraryService) {
        this.libraryService = libraryService;
    }

    @GetMapping()
    public String listReaders(Model model) {
        Map<Integer, List<Order>> ordersByReader = libraryService.getOrders().stream()
                .filter(order -> order.getReader() != null)
                .collect(Collectors.groupingBy(order -> order.getReader().getId()));

        model.addAttribute("readers", libraryService.getReaders());
        model.addAttribute("ordersByReader", ordersByReader);
        return "readers";
    }

    // Добавление читателя
    @GetMapping("/add")
    public String showAddForm(Model model) {
        model.addAttribute("reader", new Reader());
        model.addAttribute("formAction", "/readers/add");
        model.addAttribute("formTitle", "Add reader");
        model.addAttribute("submitText", "Save reader");
        return "reader_form";
    }

    @PostMapping("/add")
    public String addReader(@ModelAttribute Reader reader) {
        reader.setId(libraryService.getReaders().size() + 1);
        libraryService.addReader(reader);
        return "redirect:/readers";
    }

    // Редактирование читателя
    @GetMapping("/edit/{id}")
    public String showEditForm(@PathVariable int id, Model model) {
        Reader reader = libraryService.getReaders().stream().filter(r -> r.getId() == id).findFirst().orElse(null);
        model.addAttribute("reader", reader);
        model.addAttribute("formAction", "/readers/edit/" + id);
        model.addAttribute("formTitle", "Edit reader");
        model.addAttribute("submitText", "Save changes");
        return "reader_form";
    }

    @PostMapping("/edit/{id}")
    public String editReader(@PathVariable int id, @ModelAttribute Reader updatedReader) {
        libraryService.getReaders().removeIf(r -> r.getId() == id);
        updatedReader.setId(id);
        libraryService.getReaders().add(updatedReader);
        return "redirect:/readers";
    }

    // Удаление читателя
    @GetMapping("/delete/{id}")
    public String deleteReader(@PathVariable int id) {
        libraryService.getReaders().removeIf(r -> r.getId() == id);
        return "redirect:/readers";
    }
}
