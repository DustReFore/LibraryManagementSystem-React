package com.example.first_project.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate dateIssued;
    private LocalDate dateReturned;
    private boolean active;

    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book;

    @ManyToOne
    @JoinColumn(name = "reader_id")
    private Reader reader;

    public Order(Long id, Book book, Reader reader, LocalDate dateIssued, LocalDate dateReturned) {
        this.id = id;
        this.book = book;
        this.reader = reader;
        this.dateIssued = dateIssued;
        this.dateReturned = dateReturned;
    }

    public Order() {}

    public Long getId() {return id;}
    public void setId(Long id) {this.id = id;}

    public Book getBook() {return book;}
    public void setBook(Book book) {this.book = book;}

    public Reader getReader() {return reader;}
    public void setReader(Reader reader) {this.reader = reader;}

    public LocalDate getDateIssued() {return dateIssued;}
    public void setDateIssued(LocalDate dateIssued) {this.dateIssued = dateIssued;}

    public LocalDate getDateReturned() {return dateReturned;}
    public void setDateReturned(LocalDate dateReturned) {this.dateReturned = dateReturned;}

    public boolean isActive() {return active;}
    public void setActive(boolean active) {this.active = active;}
}
