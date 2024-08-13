package com.example.backend.category;

import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class CategorySevice {
    public CategoryRepository categoryRepository;
    public String getCategoryNameById(Long categoryId) {
        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new NoSuchElementException("Category not found"));
        return category.getName();
    }
}
