package be.ehb.backend.dao;

import be.ehb.backend.model.Order;
import org.springframework.data.repository.CrudRepository;

public interface OrderDAO extends CrudRepository<Order, Integer> {
    Iterable<Order> findAllByEmail(String email);
}
