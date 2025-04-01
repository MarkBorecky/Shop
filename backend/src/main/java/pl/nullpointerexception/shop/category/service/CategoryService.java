package pl.nullpointerexception.shop.category.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.nullpointerexception.shop.category.model.Category;
import pl.nullpointerexception.shop.category.repository.CategoryRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
}
