package be.ehb.backend.controller;

import be.ehb.backend.dao.CategoryDAO;
import be.ehb.backend.dao.OrderDAO;
import be.ehb.backend.dao.ProductDAO;
import be.ehb.backend.model.Category;
import be.ehb.backend.model.Order;
import be.ehb.backend.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/api")
public class ApiController {
    private final ProductDAO productDAO;
    private final CategoryDAO categoryDAO;
    private final OrderDAO orderDAO;

    @Autowired
    public ApiController(ProductDAO productDAO, CategoryDAO categoryDAO, OrderDAO orderDAO) {
        this.productDAO = productDAO;
        this.categoryDAO = categoryDAO;
        this.orderDAO = orderDAO;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/products", method = RequestMethod.GET)
    @ResponseBody
    public Iterable<Product> getAllProducts(@Nullable @RequestParam("category") String category) {
        if (category == null) {
            return productDAO.findAll();
        }
        return productDAO.getAllByCategory_Name(category);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/categories", method = RequestMethod.GET)
    @ResponseBody
    public Iterable<Category> getAllCategories() {
        return categoryDAO.findAll();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/orders", method = RequestMethod.GET)
    @ResponseBody
    public Iterable<Order> getAllOrdersByEmail(@RequestParam(name = "email") String email) {
        return orderDAO.findAllByEmail(email);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/orders", method = RequestMethod.POST)
    @ResponseBody
    public HttpStatus addOrder(@RequestParam(name = "email") String email, @RequestParam(name = "price") String price, @RequestParam(name = "products") String products) {
        Order order = new Order();
        order.setEmail(email);
        order.setProducts(products);
        order.setPrice(Double.parseDouble(price));
        orderDAO.save(order);
        return HttpStatus.CREATED;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/products/{id}", method = RequestMethod.PUT)
    @ResponseBody
    public HttpStatus subtractProductAmountById(@PathVariable("id") String id, @RequestParam(name = "amount") int amount) {
        int intID = Integer.parseInt(id);
        if (productDAO.existsById(intID)) {
            var product = productDAO.findById(intID);
            Product newProduct = product.get();
            int newAmount = newProduct.getAmount() - amount;
            newProduct.setAmount(newAmount);
            productDAO.save(newProduct);
            return HttpStatus.OK;
        }
        return HttpStatus.NOT_FOUND;
    }
}
