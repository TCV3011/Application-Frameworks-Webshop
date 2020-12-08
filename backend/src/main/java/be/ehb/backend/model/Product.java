package be.ehb.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id;

    @Size(min = 4, max = 20, message = "Name should be between 4 and 20 characters long.")
    private String name;

    @NotBlank(message = "Description cannot be empty")
    private String description;

    @NotBlank(message = "Price cannot be empty")
    private double price;

    @ManyToOne
    @JoinColumn(name = "product_categ", nullable = false)
    @JsonIgnore
    private Category category;

    public Product() {
    }

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
