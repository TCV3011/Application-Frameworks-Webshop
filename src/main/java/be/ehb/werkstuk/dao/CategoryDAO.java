package be.ehb.werkstuk.dao;

import be.ehb.werkstuk.models.Category;
import org.springframework.data.repository.CrudRepository;

public interface CategoryDAO extends CrudRepository<Category, Integer> {
}
