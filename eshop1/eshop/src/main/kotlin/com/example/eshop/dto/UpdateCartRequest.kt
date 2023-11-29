package com.example.eshop.dto

data class UpdateCartRequest(
    val productId: Long,
    val count: Int
)
