package pl.nullpointerexception.shop.product.controller;

import jakarta.validation.constraints.Pattern;
import lombok.RequiredArgsConstructor;
import org.hibernate.validator.constraints.Length;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import pl.nullpointerexception.shop.product.model.Product;
import pl.nullpointerexception.shop.product.service.ProductService;

@RestController
@RequiredArgsConstructor
@Validated
public class ProductController {
	
	private final ProductService service;
	private final ProductService productService;
	
	@GetMapping("/products")
	public Page<Product> getProducts(Pageable pageable) {
		return this.service.getProducts(pageable);
	}
	
	@GetMapping("/products/{slug}")
	public Product getProductBySlug(
			@Pattern(regexp = "[a-z0-9//-]+")
			@Length(min = 4, max = 255)
			@PathVariable String slug) {
		return productService.getProductBySlug(slug);
	}
}
