package pl.nullpointerexception.shop.admin.product.dto;

import java.math.BigDecimal;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.nullpointerexception.shop.admin.product.model.AdminProductCurrency;
import pl.nullpointerexception.shop.admin.product.service.AdminProduct;

@Data
@NoArgsConstructor
public class AdminProductDTO {
	@NotBlank
	@Length(min = 4)
	private String name;
	
	@NotBlank
	@Length(min = 4)
	private String category;
	
	@NotBlank
	@Length(min = 4)
	private String description;
		
	@Min(0)
	private BigDecimal price;
	
	private AdminProductCurrency currency;
	private String image;
	
	public AdminProduct mapToAdminProduct(Long id) {
		return AdminProduct.builder()
				.id(id)
				.name(this.name)
				.category(this.category)
				.description(this.description)
				.price(this.price)
				.currency(this.currency)
				.image(this.image)
				.build();
	}
}
