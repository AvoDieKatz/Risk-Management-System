package com.example.rms.category;

import com.example.rms.business.thread.category.Category;
import com.example.rms.business.thread.category.CategoryRepository;
import com.example.rms.business.thread.category.CategoryServiceImpl;
import com.example.rms.business.thread.category.dto.CategoryDTO;
import com.example.rms.business.thread.category.dto.CategoryRequest;
import com.example.rms.business.thread.category.dto.CategoryWithThreads;
import com.example.rms.converter.DTOConverter;
import com.example.rms.exceptions.InvalidRequestBodyException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.context.ActiveProfiles;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;

@ActiveProfiles("test")
@ExtendWith(MockitoExtension.class)
public class CategoryServiceTests {
    @Mock
    private CategoryRepository repository;
    @InjectMocks
    private CategoryServiceImpl service;

    @Test
    void GetCategoryList_Normal_ReturnsCategoryList() {
        // Arrange
        List<Category> categoryReturn = new ArrayList<>();
        for (int i=0; i<5 ; i++) {
            categoryReturn.add(Mockito.mock(Category.class));
        }
        given(repository.findAll()).willReturn(categoryReturn);

        // Act
        List<CategoryDTO> savedCategories = service.getCategories().stream().map(el -> DTOConverter.convertToDTO(el, CategoryDTO.class)).toList();

        // Assert
        assertThat(savedCategories).isNotNull();
        assertThat(savedCategories.size()).isEqualTo(5);
    }

    @Test
    void GetCategoryDetail_IdExists_ReturnCategoryWithThreads() {
        int categoryId = 1;
        CategoryWithThreads expectedCategory = mock(CategoryWithThreads.class);
        given(repository.findById(eq(categoryId), eq(CategoryWithThreads.class))).willReturn(
                Optional.ofNullable(expectedCategory)
        );
        CategoryWithThreads returnedCategory = service.getCategoryDetail(categoryId);
        assertThat(returnedCategory).isNotNull();
        assertThat(returnedCategory).hasFieldOrProperty("threads");
        verify(repository, times(1)).findById(categoryId, CategoryWithThreads.class);
    }

    @Test
    void CreateCategory_NewCategoryNameNotExist_ReturnNewCategory() {
        Category expectedCategory = mock(Category.class);
        CategoryRequest mockedRequest = mock(CategoryRequest.class);
        given(repository.save(any(Category.class))).willReturn(expectedCategory);

        CategoryDTO newCategory = service.createCategory(mockedRequest);
        assertThat(newCategory).isNotNull();
        assertThat(newCategory.getId()).isEqualTo(expectedCategory.getId());
        assertThat(newCategory).hasOnlyFields("id", "name");

    }

    @Test
    void CreateCategory_NewCategoryNameExist_ThrowException() {
        CategoryRequest mockedRequest = new CategoryRequest("Finance");
        given(repository.existsByName(eq("Finance"))).willReturn(true);
        assertThatThrownBy(
                () -> service.createCategory(mockedRequest)
        ).isInstanceOf(InvalidRequestBodyException.class);
        verify(repository, times(1)).existsByName("Finance");
    }


}
