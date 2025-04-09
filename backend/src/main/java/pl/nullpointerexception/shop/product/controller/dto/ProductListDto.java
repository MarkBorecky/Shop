package pl.nullpointerexception.shop.product.controller.dto;

import lombok.Builder;
import pl.nullpointerexception.shop.product.model.Product;

import java.math.BigDecimal;

@Builder
public record ProductListDto(
        Long id,
        String name,
        String description,
        BigDecimal price,
        String currency,
        String image,
        String slug
) {

    public static ProductListDto mapFromProduct(Product product) {
        return ProductListDto.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .currency(product.getCurrency())
                .image(product.getImage())
                .slug(product.getSlug())
                .build();
    }
}
