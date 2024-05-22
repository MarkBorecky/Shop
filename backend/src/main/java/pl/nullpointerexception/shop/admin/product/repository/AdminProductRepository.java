package pl.nullpointerexception.shop.admin.product.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.nullpointerexception.shop.admin.product.service.AdminProduct;

public interface AdminProductRepository extends JpaRepository<AdminProduct, Long> {
}
