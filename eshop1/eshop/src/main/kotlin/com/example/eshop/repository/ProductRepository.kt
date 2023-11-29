package com.example.eshop.repository;

import com.example.eshop.entity.Product
import org.springframework.data.jpa.repository.JpaRepository
import java.util.*

interface ProductRepository : JpaRepository<Product, String> {

    fun findByArticleIgnoreCase(article: String): Optional<Product>

    fun findByTitleIgnoreCase(title: String): Optional<Product>

    fun findByCategoryIgnoreCase(category: String): Optional<Product>



}

