package pl.nullpointerexception.shop.product.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import pl.nullpointerexception.shop.product.model.Product;
import pl.nullpointerexception.shop.product.repository.ProductRepository;

@Service
@RequiredArgsConstructor
public class ProductService {
	
	private final ProductRepository repository;
	public Page<Product> getProducts(Pageable pageable) {
		return this.repository.findAll(pageable);
	}
	
	public Product getProductBySlug(String slug) {
		return repository.getProductBySlug(slug)
				.orElseThrow();
	}
}
