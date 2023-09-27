package com.example.rms.business.thread.category;

import com.example.rms.business.thread.category.dto.CategoryDTO;
import com.example.rms.business.thread.category.dto.CategoryWithThreads;
import com.example.rms.business.thread.category.dto.CategoryRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/category")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryServiceImpl categoryService;

    @GetMapping
    public ResponseEntity<Iterable<CategoryDTO>> getAllRiskCategory() {
        return ResponseEntity.ok(categoryService.getCategories());
    }

    @GetMapping("{categoryId}")
    public ResponseEntity<CategoryWithThreads> getCategoryDetail(@PathVariable("categoryId") Integer categoryId) {
        return ResponseEntity.ok(categoryService.getCategoryDetail(categoryId));
    }

    @PostMapping
    public ResponseEntity<CategoryDTO> createCategory(@RequestBody @Valid CategoryRequest request) {
        return new ResponseEntity<>(categoryService.createCategory(request), HttpStatus.CREATED);
    }

    @PutMapping("{categoryId}")
    public ResponseEntity<CategoryDTO> updateCategory(@RequestBody @Valid CategoryRequest request, @PathVariable("categoryId") Integer categoryId) {
        return new ResponseEntity<>(categoryService.updateCategory(request, categoryId), HttpStatus.OK);
    }

    @DeleteMapping("{categoryId}")
    public ResponseEntity<HttpStatus> deleteCategory(@PathVariable("categoryId") Integer categoryId) {
        categoryService.deleteCategory(categoryId);
        return ResponseEntity.noContent().build();
    }

}
