package pl.nullpointerexception.shop.category.service;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.nullpointerexception.shop.admin.category.model.CategoryProductDto;
import pl.nullpointerexception.shop.category.model.Category;
import pl.nullpointerexception.shop.category.repository.CategoryRepository;
import pl.nullpointerexception.shop.product.model.Product;
import pl.nullpointerexception.shop.product.repository.ProductRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Transactional(readOnly = true)
    public CategoryProductDto getCategoryWithProducts(String slug, Pageable pageable) {
        Category category = categoryRepository.findBySlug(slug);
        Page<Product> page = productRepository.findByCategoryId(category.getId(), pageable);
        return new CategoryProductDto(category, page);
    }
}
