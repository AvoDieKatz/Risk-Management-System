package com.example.rms.business.category;

import com.example.rms.business.category.dto.CategoryDTO;
import com.example.rms.business.category.dto.CategoryWithThreads;
import com.example.rms.business.category.dto.CategoryRequest;

import java.util.List;

public interface CategoryService {
    List<CategoryDTO> getCategories();
    CategoryWithThreads getCategoryDetail(Integer categoryId);
    CategoryDTO createCategory(CategoryRequest request);
    CategoryDTO updateCategory(CategoryRequest request, Integer categoryId);
    void deleteCategory(Integer categoryId);
}
