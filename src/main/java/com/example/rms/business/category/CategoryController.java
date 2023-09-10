package com.example.rms.business.category;

import com.example.rms.business.category.dto.CategoryDTO;
import com.example.rms.business.category.dto.CategoryWithThreads;
import com.example.rms.business.category.request.CategoryRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/thread/category")
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
    @ResponseBody
    public ResponseEntity<CategoryDTO> createCategory(@RequestBody CategoryRequest request) {
        return new ResponseEntity<>(categoryService.createCategory(request), HttpStatus.CREATED);
    }

    @PutMapping("{categoryId}")
    @ResponseBody
    public ResponseEntity<CategoryDTO> updateCategory(@RequestBody CategoryRequest request, @PathVariable("categoryId") Integer categoryId) {
        return new ResponseEntity<>(categoryService.updateCategory(request, categoryId), HttpStatus.OK);
    }

    @DeleteMapping("{categoryId}")
    public ResponseEntity<HttpStatus> deleteCategory(@PathVariable("categoryId") Integer categoryId) {
        categoryService.deleteCategory(categoryId);
        return ResponseEntity.noContent().build();
    }

}
