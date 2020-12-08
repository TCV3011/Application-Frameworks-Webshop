package be.ehb.backend.dao;

import be.ehb.backend.model.Product;
import org.springframework.data.repository.CrudRepository;

public interface ProductDAO extends CrudRepository<Product, Integer> {
    Iterable<Product> getAllByCategory_Name(String name);
}
