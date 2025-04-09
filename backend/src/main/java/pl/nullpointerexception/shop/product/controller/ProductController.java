package pl.nullpointerexception.shop.product.controller;

import jakarta.validation.constraints.Pattern;
import lombok.RequiredArgsConstructor;
import org.hibernate.validator.constraints.Length;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import pl.nullpointerexception.shop.product.controller.dto.ProductListDto;
import pl.nullpointerexception.shop.product.model.Product;
import pl.nullpointerexception.shop.product.service.ProductService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Validated
public class ProductController {
	
	private final ProductService service;
	private final ProductService productService;
	
	@GetMapping("/products")
	public PageImpl<ProductListDto> getProducts(Pageable pageable) {
		List<ProductListDto> productListDtos = this.service.getProducts(pageable).stream()
				.map(ProductListDto::mapFromProduct)
				.toList();

		return new PageImpl<>(productListDtos, pageable, productListDtos.size());
	}

	@GetMapping("/products/{slug}")
	public Product getProductBySlug(
			@Pattern(regexp = "[a-z0-9/-]+")
			@Length(min = 4, max = 255)
			@PathVariable String slug) {
		return productService.getProductBySlug(slug);
	}
}
