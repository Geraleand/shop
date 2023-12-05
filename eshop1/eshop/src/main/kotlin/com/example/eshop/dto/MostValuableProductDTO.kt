package com.example.eshop.dto

data class MostValuableProductDTO(
    private val productId: Long,
    private val productName: String,
    private val productArticle: String,
    private val categoryId: Long,
    private val categoryName: String,
    private val income: Double
)
