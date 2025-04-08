package pl.nullpointerexception.shop.admin.category.model;

import org.springframework.data.domain.Page;
import pl.nullpointerexception.shop.category.model.Category;
import pl.nullpointerexception.shop.product.model.Product;

public record CategoryProductDto(
        Category category,
        Page<Product> products
) {
}
