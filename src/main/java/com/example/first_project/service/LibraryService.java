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
    public Order addOrder(Order order) {
        return orderRepository.save(order);
    }
    public Reader addReader(Reader reader) {
        return readerRepository.save(reader);
    }

    public Author getAuthorById(Long id) {
        return authorRepository.findById(id).orElse(null);
    }
    public Book getBookById(Long id) {
        return bookRepository.findById(id).orElse(null);
    }
    public Order getOrderById(Long id) {
        return orderRepository.findById(id).orElse(null);
    }
    public Reader getReaderById(Long id) {
        return readerRepository.findById(id).orElse(null);
    }

    public void deleteAuthor(Long id) {
        authorRepository.deleteById(id);
    }
    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }
    public void deleteReader(Long id) {
        readerRepository.deleteById(id);
    }
    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }

    public Category getCategoryByName(String name) {
        return categoryRepository.findByName(name)
                .orElseGet(() -> categoryRepository.save(new Category(null, name)));
    }
}
