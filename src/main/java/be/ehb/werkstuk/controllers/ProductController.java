package be.ehb.werkstuk.controllers;

import be.ehb.werkstuk.dao.ProductDAO;
import be.ehb.werkstuk.models.Category;
import be.ehb.werkstuk.models.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Controller
public class ProductController {
    @Autowired
    private ProductDAO repo;

    @ModelAttribute("allProducts")
    public Iterable<Product> getAllProducts(){
        return repo.findAll();
    }

    // Custom function to get all categories that are linked
    // at a product in the catalog.
    // So if a category is not used -> it will not show up in the filter list
    @ModelAttribute("allUsedCategories")
    public Iterable<String> getAllUsedCategories() {
        var products = getAllProducts();
        Set<String> tempSet = new HashSet<String>();

        for (Product product:products) {
            tempSet.add(product.getCategory().getName());
        }
        return tempSet;
    }

    @RequestMapping(value = {"/", "/index"}, method = RequestMethod.POST)
    public String filteredIndex(@RequestParam(value = "category", required = false) String category, ModelMap model) {
        if(category == ""){
            List<Product> products = (List<Product>) repo.findAll();
            model.addAttribute("filteredProducts", products);
            return "index";
        }
        List<Product> products = (List<Product>) repo.getAllByCategory_Name(category);
        model.addAttribute("filteredProducts", products);
        return "index";
    }

    @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
    public String showIndex(ModelMap map){
        List<Product> products = (List<Product>) repo.findAll();
        map.addAttribute("filteredProducts", products);
        return "index";
    }
}
