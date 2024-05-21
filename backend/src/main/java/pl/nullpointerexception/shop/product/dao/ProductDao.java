package pl.nullpointerexception.shop.product.dao;

import org.springframework.stereotype.Repository;
import pl.nullpointerexception.shop.product.model.Product;

import java.math.BigDecimal;
import java.util.List;

@Repository
public class ProductDao {
	public List<Product> getAll() {
		return List.of(
				new Product("Product 1", "Kategoria 1", "Opis produktu 1", BigDecimal.valueOf(11.99), "PLN"),
				new Product("Product 2", "Kategoria 2", "Opis produktu 2", BigDecimal.valueOf(14.99), "PLN"),
				new Product("Product 3", "Kategoria 3", "Opis produktu 3", BigDecimal.valueOf(19.99), "PLN")
		);
	}
}
