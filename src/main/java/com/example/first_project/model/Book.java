package com.example.first_project.model;

public class Book {
    private int id;
    private String title;
    private Author author;
    private int year;
    private Category category;


    public Book(int id, String title, Author author, int year, Category category) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.year = year;
        this.category = category;
    }

    public Book() {}

    public int getId() {return id;}
    public void setId(int id) {this.id = id;}

    public String getTitle() {return title;}
    public void setTitle(String title) {this.title = title;}

    public Author getAuthor() {return author;}
    public void setAuthor(Author author) {this.author = author;}

    public int getYear() {return year;}
    public void setYear(int year) {this.year = year;}

    public Category getCategory() {return category;}
    public void setCategory(Category category) {this.category = category;}
}
