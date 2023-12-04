package com.example.eshop.service

import com.example.eshop.entity.Category
import com.example.eshop.repository.CategoryRepository
import org.springframework.stereotype.Service

@Service
class CategoryService(
    private val categoryRepository: CategoryRepository
) {

    fun getAllCategories(): List<Category> {
        return categoryRepository.findAll()
    }

    fun createCategory(categoryName: String): Category {
        val category = Category()
        category.name = categoryName
        return categoryRepository.save(category)
    }
}