package com.example.eshop.dto

data class PurchaseItemDTO(
    val purchaseId: Long,
    val productId: Long,
    val productName: String,
    val productArticle: String,
    val categoryId: Long,
    val categoryName: String,
    val count: Int,
    val price: Double
)
