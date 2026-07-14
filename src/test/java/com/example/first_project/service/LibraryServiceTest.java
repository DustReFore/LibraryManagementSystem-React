package com.example.first_project.service;

import com.example.first_project.model.Book;
import com.example.first_project.repository.*;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class LibraryServiceTest {

    @Mock
    private BookRepository bookRepository;

    @Mock
    private AuthorRepository authorRepository;

    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private ReaderRepository readerRepository;

    @InjectMocks
    private LibraryService libraryService;

    @Test
    void getBooksReturnsAllBooks() {
        Book book = new Book();
        book.setId(1L);
        book.setTitle("Test Book");

        when(bookRepository.findAll()).thenReturn(List.of(book));

        List<Book> books = libraryService.getBooks();

        assertThat(books).hasSize(1);
        assertThat(books.get(0).getTitle()).isEqualTo("Test Book");
        verify(bookRepository).findAll();
    }

    @Test
    void addBookSavesBook() {
        Book book = new Book();
        book.setTitle("New Book");

        when(bookRepository.save(book)).thenReturn(book);

        Book savedBook = libraryService.addBook(book);

        assertThat(savedBook.getTitle()).isEqualTo("New Book");
        verify(bookRepository).save(book);
    }
}