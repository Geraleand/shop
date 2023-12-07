package com.example.eshop.controller

import com.example.eshop.dto.ProductDTO
import com.example.eshop.service.ProductsService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/products")
class ProductsController(
    private val productsService: ProductsService
) {

    @GetMapping("/list")
    fun getProducts(): List<ProductDTO> = productsService.getProducts()

    @GetMapping("/one/{productId}")
    fun getOneProduct(@PathVariable(value = "productId") id: Long): ProductDTO =
        productsService.getOneProduct(id)

    @PostMapping("/create")
    fun createProduct(@ModelAttribute productDTO: ProductDTO): ProductDTO =
        productsService.createProduct(productDTO)

    @PutMapping("/update")
    fun updateProduct(@ModelAttribute productDTO: ProductDTO): ProductDTO =
        productsService.updateProduct(productDTO)

    @DeleteMapping("/delete/{productId}")
    fun deleteProduct(@PathVariable(value = "productId") id: Long) =
        productsService.deleteProduct(id)
}