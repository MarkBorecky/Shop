package pl.nullpointerexception.shop.category.controller;

import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import org.hibernate.validator.constraints.Length;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import pl.nullpointerexception.shop.admin.category.model.CategoryProductDto;
import pl.nullpointerexception.shop.category.model.Category;
import pl.nullpointerexception.shop.category.service.CategoryService;

import java.util.List;

@RestController
@AllArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping("/categories")
    public List<Category> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @GetMapping("/categories/{slug}/products")
    public CategoryProductDto getAllCategoryWithProducts(
            @PathVariable @Pattern(regexp = "[a-z0-9\\-]+") @Length(max = 255) String slug,
            Pageable pageable) {
        return categoryService.getCategoryWithProducts(slug, pageable);
    }
}
