package com.example.eshop.dto

data class ProductDTO(
    val name: String,
    val photo: ByteArray,
    val availableCount: Int,
    val categoryId: Long,
    val categoryName: String,
    val id: Long? = null,
    val supplier: String,
    val article: String,
    val price: Double
)
