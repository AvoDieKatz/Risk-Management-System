package com.example.rms.business.thread.category;

import com.example.rms.business.thread.category.dto.CategoryDTO;
import com.example.rms.business.thread.category.dto.CategoryWithThreads;
import com.example.rms.business.thread.category.dto.CategoryRequest;
import com.example.rms.converter.DTOConverter;
import com.example.rms.exceptions.InvalidRequestBodyException;
import com.example.rms.exceptions.ResourceNotFoundException;
import com.example.rms.exceptions.UnsatisfiedConditionException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@AllArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private CategoryRepository categoryRepository;

    @Override
    public List<CategoryDTO> getCategories() {
        return categoryRepository.findAll().stream().map(el -> DTOConverter.convertToDTO(el, CategoryDTO.class)).toList();
    }

    @Override
    public CategoryWithThreads getCategoryDetail(Integer categoryId) {
        Optional<CategoryWithThreads> optional = categoryRepository.findById(categoryId, CategoryWithThreads.class);
        if (optional.isPresent()) {
            return optional.get();
        }
        throw new ResourceNotFoundException("Category with ID " + categoryId + " could not be found.");
    }

    @Override
    public CategoryDTO createCategory(CategoryRequest request) {
        if (!categoryRepository.existsByName(request.name())) {
            Category newCategory = Category.builder()
                    .name(request.name())
                    .build();
            Category savedCategory = categoryRepository.save(newCategory);
            return DTOConverter.convertToDTO(savedCategory, CategoryDTO.class);
        }
//        throw new InvalidRequestBodyException(new ArrayList<>(List.of("Name already exists")));

        throw new InvalidRequestBodyException((HashMap<String, String>) Map.of("name", "Name already exists."));
    }

    @Override
    public CategoryDTO updateCategory(CategoryRequest request, Integer categoryId) {
        Optional<Category> optional = categoryRepository.findById(categoryId);
        if (optional.isPresent()) {
            Category foundCategory = optional.get();
            if (categoryRepository.existsByName(request.name())) {
//                throw new InvalidRequestBodyException(List.of("Name `" + request.name() + "` is already taken"));
                throw new InvalidRequestBodyException((HashMap<String, String>) Map.of("name", "Name is already taken."));
            }
            foundCategory.setName(request.name());
            Category updatedCategory = categoryRepository.save(foundCategory);
            return DTOConverter.convertToDTO(updatedCategory, CategoryDTO.class);
        }
        throw new ResourceNotFoundException("Can't find category " + categoryId + " to update");
    }

    @Override
    public void deleteCategory(Integer categoryId) {
        Optional<Category> optionalCategory = categoryRepository.findById(categoryId);
        if (optionalCategory.isEmpty()) {
            throw new ResourceNotFoundException("Category not found");
        }
        Category category = optionalCategory.get();
        if (category.getThreads().size() > 0) {
            throw new UnsatisfiedConditionException("Cannot delete the category because it is in use.");
        }
        categoryRepository.deleteById(categoryId);
    }

}
