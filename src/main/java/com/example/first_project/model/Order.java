package com.example.first_project.model;

import java.time.LocalDate;

public class Order {
    private int id;
    private Book book;
    private Reader reader;
    private LocalDate dateIssued;
    private LocalDate dateReturned;
    private boolean active;

    public Order(int id, Book book, Reader reader, LocalDate dateIssued, LocalDate dateReturned) {
        this.id = id;
        this.book = book;
        this.reader = reader;
        this.dateIssued = dateIssued;
        this.dateReturned = dateReturned;
        this.active = active;
    }

    public Order() {}

    public int getId() {return id;}
    public void setId(int id) {this.id = id;}

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
