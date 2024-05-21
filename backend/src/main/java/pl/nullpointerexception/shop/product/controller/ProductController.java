package pl.nullpointerexception.shop.product.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.nullpointerexception.shop.product.dao.ProductDao;
import pl.nullpointerexception.shop.product.model.Product;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ProductController {
	
	private final ProductDao productDao;
	
	@GetMapping("/products")
	public List<Product> getProducts() {
		return this.productDao.getAll();
	}
}
