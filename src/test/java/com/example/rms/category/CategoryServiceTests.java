package com.example.rms.category;

import com.example.rms.business.thread.category.Category;
import com.example.rms.business.thread.category.CategoryRepository;
import com.example.rms.business.thread.category.CategoryServiceImpl;
import com.example.rms.business.thread.category.dto.CategoryDTO;
import com.example.rms.converter.DTOConverter;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.context.ActiveProfiles;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;

@ActiveProfiles("test")
@ExtendWith(MockitoExtension.class)
public class CategoryServiceTests {
    @Mock
    private CategoryRepository repository;
    @InjectMocks
    private CategoryServiceImpl service;

    @DisplayName("JUnit test for getCategories()")
    @Test
    void CategoryService_GetCategoriesSlim_ReturnsCategorySlimList() {
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



//    @BeforeEach
//    public void setUp() {
//        Category category1 = Category.builder()
//                .name("Human")
//                .build();
//        Category category2 = Category.builder()
//                .name("Financial")
//                .build();
//        Category category3 = Category.builder()
//                .name("Environment")
//                .build();
//
//        categoryList = List.of(category1, category2, category3);
//        categoryList = Arrays.asList(category1, category2, category3);

//        repository.save(category1);
//        repository.save(category2);
//        repository.save(category3);


//        List<Category> categoryList = new ArrayList<>(List.of(category1, category2, category3));
//        repository.saveAll(categoryList);

//        service.createCategory(new CategoryRequest("Human"));
//        service.createCategory(new CategoryRequest("Finance"));
//        service.createCategory(new CategoryRequest("Environment"));
//    }

//    @Test
//    void CategoryService_FindOneCategory_CaseSensitive() {
//        CategoryWithThreads category = service.getCategoryDetail(1);
//
//        Assertions.assertThat(category.getName()).isEqualTo("Human");
//    }
//
//    @Test
//    void CategoryService_FindOneCategory_CaseInsensitive() {
//        CategoryWithThreads category = service.getCategoryDetail(1);
//
//        Assertions.assertThat(category.getName()).isEqualTo("human");
//    }

//    @Test
//    void CategoryService_CreateNewCategory() {
//        // Case 1: Non-existing Name
//        CategoryDTO testDTO = new CategoryDTO();
//        testDTO.setId(4);
//        testDTO.setName("Employee");
//
//        CategoryDTO categoryDTO = service.createCategory(new CategoryRequest("Employee"));
//
//        Assertions.assertThat(categoryDTO).isEqualTo(testDTO);
//
//        // Case 2: Existing Name
//        Assertions.assertThatExceptionOfType(InvalidRequestBodyException.class)
//                        .isThrownBy(() -> service.createCategory(new CategoryRequest("Employee")));
//    }
//
//    @Test
//    void CategoryService_UpdateExistingCategory() {
//
//    }

}
