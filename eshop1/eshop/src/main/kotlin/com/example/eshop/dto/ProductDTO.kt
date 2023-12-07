package com.example.eshop.dto

import org.springframework.web.multipart.MultipartFile

data class ProductDTO(
    val name: String,
    val photo: MultipartFile? = null,
    val availableCount: Int,
    val categoryId: Long,
    val categoryName: String,
    val id: Long? = null,
    val supplier: String,
    val article: String,
    val price: Double,
    val outputPhoto: ByteArray? = null
)
