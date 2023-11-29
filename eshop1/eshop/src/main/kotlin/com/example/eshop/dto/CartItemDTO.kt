package com.example.eshop.dto

data class CartItemDTO(
    val productId: Long,
    val productName: String,
    val productPhoto: ByteArray,
    val count: Int
)
