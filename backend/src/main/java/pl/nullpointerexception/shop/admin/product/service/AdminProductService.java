package pl.nullpointerexception.shop.admin.product.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import pl.nullpointerexception.shop.admin.product.repository.AdminProductRepository;

@Service
@RequiredArgsConstructor
public class AdminProductService {
	private final AdminProductRepository repository;
	
	public Page<AdminProduct> getProducts(Pageable pageable) {
		return repository.findAll(pageable);
	}
	
	public AdminProduct getProductBy(Long id) {
		return repository.findById(id).orElseThrow();
	}
	
	public AdminProduct createProduct(AdminProduct product) {
		return repository.save(product);
	}
	
	public AdminProduct updateProduct(AdminProduct product) {
		return repository.save(product);
	}
	
	public void deleteProductById(Long id) {
		repository.deleteById(id);
	}
}
