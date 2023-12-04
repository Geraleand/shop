package com.example.eshop.controller

import com.example.eshop.dto.CreateCategoryRequest
import com.example.eshop.entity.Category
import com.example.eshop.service.CategoryService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/category")
class CategoryController(
    private val categoryService: CategoryService
) {

    @GetMapping("/all")
    fun getAllCategories(): List<Category> {
        return categoryService.getAllCategories()
    }

    @PostMapping("/add")
    fun createCategory(@RequestBody createCategoryRequest: CreateCategoryRequest): Category {
        return categoryService.createCategory(createCategoryRequest.categoryName)
    }
}