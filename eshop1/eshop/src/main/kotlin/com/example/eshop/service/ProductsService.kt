package com.example.eshop.service

import com.example.eshop.dto.ProductDTO
import com.example.eshop.repository.ProductRepository
import org.springframework.stereotype.Service

@Service
class ProductsService(
    private val productRepository: ProductRepository
) {

    fun getProducts(): List<ProductDTO> =
        productRepository.findAll().map { product ->
            ProductDTO(
                name = product.title!!,
                photo = product.photo!!,
                availableCount =  product.count!!,
                categoryId = product.category?.id!!,
                categoryName = product.category?.name!!
            )
    }
}