package pl.nullpointerexception.shop.admin.category.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.nullpointerexception.shop.admin.category.controller.dto.AdminCategoryDto;
import pl.nullpointerexception.shop.admin.category.model.AdminCategory;
import pl.nullpointerexception.shop.admin.category.repository.AdminCategoryRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class AdminCategoryService {

    private final AdminCategoryRepository adminCategoryRepository;


    public List<AdminCategory> getAllCategories() {
        return adminCategoryRepository.findAll();
    }

    public AdminCategory getCategoryById(Long id) {
        return adminCategoryRepository.findById(id)
                .orElseThrow();
    }

    public AdminCategory createCategory(AdminCategory adminCategory) {
        return adminCategoryRepository.save(adminCategory);
    }

    public AdminCategory updateCategoryById(AdminCategory adminCategory) {
        return adminCategoryRepository.save(adminCategory);
    }

    public void deleteCategoryById(Long id) {
        adminCategoryRepository.deleteById(id);
    }
}
