package pl.nullpointerexception.shop.admin.product.dto;

import lombok.Data;
import pl.nullpointerexception.shop.admin.product.service.AdminProduct;

import java.math.BigDecimal;

@Data
public class AdminProductDTO {
	private String name;
	private String category;
	private String description;
	private BigDecimal price;
	private String currency;
	
	public AdminProduct mapToAdminProduct(Long id) {
		return AdminProduct.builder()
				.id(id)
				.name(this.name)
				.category(this.category)
				.description(this.description)
				.price(this.price)
				.currency(this.currency)
				.build();
	}
}
