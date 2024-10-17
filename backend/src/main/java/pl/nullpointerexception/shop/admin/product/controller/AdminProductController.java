package pl.nullpointerexception.shop.admin.product.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.FileSystemResourceLoader;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import pl.nullpointerexception.shop.admin.product.dto.AdminProductDTO;
import pl.nullpointerexception.shop.admin.product.dto.UploadResponse;
import pl.nullpointerexception.shop.admin.product.service.AdminProduct;
import pl.nullpointerexception.shop.admin.product.service.AdminProductService;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequiredArgsConstructor
public class AdminProductController {
	private static final Long EMPTY_ID = null;
	
	private final AdminProductService service;
	
	@GetMapping("/admin/products")
	public Page<AdminProduct> getProducts(Pageable pageable) {
		return this.service.getProducts(pageable);
	}
	
	@GetMapping("/admin/products/{id}")
	public AdminProduct getProductBy(@PathVariable Long id) {
		return this.service.getProductBy(id);
	}
	
	@PostMapping("/admin/products")
	public AdminProduct createProduct(@Valid @RequestBody AdminProductDTO productDTO) {
		return this.service.createProduct(productDTO.mapToAdminProduct(EMPTY_ID));
	}
	
	@PutMapping("/admin/products/{id}")
	public AdminProduct updateProduct(@PathVariable Long id, @Valid @RequestBody AdminProductDTO productDTO) {
		return this.service.updateProduct(productDTO.mapToAdminProduct(id));
	}
	
	@DeleteMapping("/admin/products/{id}")
	public void deleteProduct(@PathVariable Long id) {
		this.service.deleteProductById(id);
	}
	
	@PostMapping("/admin/products/images")
	public UploadResponse uploadImage(@RequestParam("file") MultipartFile multipartFile) {
		String filename = multipartFile.getOriginalFilename();
		String uploadDir = "./backend/data/productImages/";
		
		Path filePath = Paths.get(uploadDir).resolve(filename);
		
		try(InputStream inputStream = multipartFile.getInputStream()) {
			OutputStream outputStream = Files.newOutputStream(filePath);
			inputStream.transferTo(outputStream);
			return new UploadResponse(filename);
		} catch (IOException e) {
			throw new RuntimeException("I can't write file", e);
		}
	}
	
	@GetMapping("/data/productImage/{fileName}")
	public ResponseEntity<Resource> serverFile(@PathVariable String fileName) throws IOException {
		String uploadDir = "./backend/data/productImages/";
		FileSystemResourceLoader fileSystemResourceLoader = new FileSystemResourceLoader();
		Resource resource = fileSystemResourceLoader.getResource(uploadDir + fileName);
		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_TYPE, Files.probeContentType(Path.of(fileName)))
				.body(resource);
	}
}
