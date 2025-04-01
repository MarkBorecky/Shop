package pl.nullpointerexception.shop.admin.category.controller;

import com.github.slugify.Slugify;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.nullpointerexception.shop.admin.category.controller.dto.AdminCategoryDto;
import pl.nullpointerexception.shop.admin.category.model.AdminCategory;
import pl.nullpointerexception.shop.admin.category.service.AdminCategoryService;

import java.util.List;

@RestController
@AllArgsConstructor
public class AdminCategoryController {

    public final Slugify slugify = Slugify.builder()
            .customReplacement("_", "-")
            .build();
    private final AdminCategoryService adminCategoryService;

    @GetMapping("/admin/categories")
    public List<AdminCategory> getCategories() {
        return adminCategoryService.getAllCategories();
    }

    @GetMapping("/admin/categories/{id}")
    public AdminCategory getCategoryById(@PathVariable Long id) {
        return adminCategoryService.getCategoryById(id);
    }

    @PostMapping("/admin/categories")
    public AdminCategory createCategory(@RequestBody AdminCategoryDto adminCategoryDto) {
        return adminCategoryService.createCategory(mapToAdminCategory(adminCategoryDto));
    }

    private AdminCategory mapToAdminCategory(AdminCategoryDto adminCategoryDto) {
        return mapToAdminCategory(null, adminCategoryDto);
    }

    private AdminCategory mapToAdminCategory(Long id, AdminCategoryDto adminCategoryDto) {
        return AdminCategory.builder()
                .id(id)
                .name(adminCategoryDto.getName())
                .slug(slugifyCategoryName(adminCategoryDto.getSlug()))
                .description(adminCategoryDto.getDescription())
                .build();
    }

    private String slugifyCategoryName(String slug) {
        return slugify.slugify(slug);
    }

    @PutMapping("/admin/categories/{id}")
    public AdminCategory updateCategory(@PathVariable Long id, @RequestBody AdminCategoryDto adminCategoryDto) {
        return adminCategoryService.updateCategoryById(mapToAdminCategory(id, adminCategoryDto));
    }

    @DeleteMapping("/admin/categories/{id}")
    public void deleteCategory(@PathVariable Long id) {
        adminCategoryService.deleteCategoryById(id);
    }


}
