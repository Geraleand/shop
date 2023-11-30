package com.example.eshop.controller

import com.example.eshop.dto.ProductDTO
import com.example.eshop.service.ProductsService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/products")
class ProductsController(
    private val productsService: ProductsService
) {

    @GetMapping("/get")
    fun getProducts(): List<ProductDTO> = productsService.getProducts()
}