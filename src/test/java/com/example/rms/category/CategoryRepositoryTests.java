package com.example.rms.category;

import com.example.rms.business.category.Category;
import com.example.rms.business.category.CategoryRepository;
import com.example.rms.business.category.dto.CategoryDTO;
import com.example.rms.converter.DTOConverter;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
@ActiveProfiles("test")
public class CategoryRepositoryTests {
    private final CategoryRepository repository;

    @Autowired
    public CategoryRepositoryTests(CategoryRepository categoryRepository) {
        this.repository = categoryRepository;
    }

    @BeforeEach
    void setUp() {
        Category category1 = Category.builder()
                .name("Finance")
                .build();
        Category category2 = Category.builder()
                .name("Human")
                .build();
        Category category3 = Category.builder()
                .name("Cyber")
                .build();

        repository.saveAll(List.of(category1, category2, category3));
    }

    @DisplayName("JUnit test for findAllBy()")
    @Test
    void CategoryRepository_FindAllBy_ReturnSlimCategories() {
        List<CategoryDTO> categoryList = repository.findAll().stream().map(el -> DTOConverter.convertToDTO(el, CategoryDTO.class)).toList();
        Assertions.assertThat(categoryList.size()).isEqualTo(3);
    }
}
