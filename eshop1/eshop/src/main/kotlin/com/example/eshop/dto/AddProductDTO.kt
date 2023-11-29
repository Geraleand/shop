package com.example.eshop.dto
import org.springframework.web.multipart.MultipartFile

data class AddProductDTO (
    val title: String,
    val article: String,
    val photo: MultipartFile,
    val price: Double,
    val quantity: Int,
    val supplier: String,
    var category: String
)

