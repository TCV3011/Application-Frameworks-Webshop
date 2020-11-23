package be.ehb.werkstuk.dao;

import be.ehb.werkstuk.models.Category;
import be.ehb.werkstuk.models.Product;
import org.springframework.data.repository.CrudRepository;

public interface ProductDAO extends CrudRepository<Product, Integer> {
    Iterable<Product> getAllByCategory_Name(String name);
}
