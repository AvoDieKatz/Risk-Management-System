package com.example.rms.business.category;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
    boolean existsByName(String name);
    <T> List<T> findAllBy(Class<T> classType);
    <T> Optional<T> findById(Integer id, Class<T> classType);
}
