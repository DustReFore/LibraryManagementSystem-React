package com.example.first_project.model;

import java.util.ArrayList;
import java.util.List;

public class Author {
    private int id;
    private String firstName;
    private String lastName;
    private int year;
    private String country;

    private List<Book> books =  new ArrayList<Book>();

    public Author(int id, String firstName, String lastName,  int year, String country) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.year = year;
        this.country = country;
    }

    @Override
    public String toString() {
        return firstName + " " + lastName;
    }

    public Author() {}

    public int getId() {return id;}
    public void setId(int id) {this.id = id;}

    public String getFirstName() {return firstName;}
    public void setFirstName(String firstName) {this.firstName = firstName;}

    public String getLastName() {return lastName;}
    public void setLastName(String lastName) {this.lastName = lastName;}

    public int getYear() {return year;}
    public void setYear(int year) {this.year = year;}

    public String getCountry() {return country;}
    public void setCountry(String country) {this.country = country;}

    public List<Book> getBooks() {return books;}
    public void setBooks(List<Book> books) {this.books = books;}
}
