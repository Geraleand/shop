package com.example.eshop.repository;

import com.example.eshop.entity.Category
import org.springframework.data.jpa.repository.JpaRepository
import java.util.*

interface CategoryRepository : JpaRepository<Category, String> {

    fun findByTitleIgnoreCase(title: String): Optional<Category>

}