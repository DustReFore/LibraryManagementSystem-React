package com.example.first_project.service;

import com.example.first_project.model.*;
import com.example.first_project.repository.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LibraryService {
    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;
    private final CategoryRepository categoryRepository;
    private final OrderRepository orderRepository;
    private final ReaderRepository readerRepository;

    public LibraryService(
            BookRepository bookRepository,
            AuthorRepository authorRepository,
            CategoryRepository categoryRepository,
            OrderRepository orderRepository,
            ReaderRepository readerRepository
    ) {
        this.bookRepository = bookRepository;
        this.authorRepository = authorRepository;
        this.categoryRepository = categoryRepository;
        this.orderRepository = orderRepository;
        this.readerRepository = readerRepository;
    }

    public List<Author> getAuthors() {
        return authorRepository.findAll();
    }
    public List<Book> getBooks() {
        return bookRepository.findAll();
    }
    public List<Category> getCategories() {
        return categoryRepository.findAll();
    }
    public List<Order> getOrders() {
        return orderRepository.findAll();
    }
    public List<Reader> getReaders() {
        return readerRepository.findAll();
    }

    public Author addAuthor(Author author) {
        return authorRepository.save(author);
    }
    public Book addBook(Book book) {
        return bookRepository.save(book);
    }
    public Category addCategory(Category category) {
        return categoryRepository.save(category);
    }
    public Order addOrder(Order order) {
        return orderRepository.save(order);
    }
    public Reader addReader(Reader reader) {
        return readerRepository.save(reader);
    }
}
