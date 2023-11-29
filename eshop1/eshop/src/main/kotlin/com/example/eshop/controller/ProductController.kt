package com.example.eshop.controller

import com.example.eshop.dto.AddProductDTO
import com.example.eshop.dto.UserDTO
import com.example.eshop.entity.User
import com.example.eshop.service.ProductService
import com.example.eshop.service.UserService
import jakarta.servlet.http.HttpServletRequest
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/product")
class ProductController(
    private val productService: ProductService
) {

    @PostMapping("/add")
    fun addProduct(@ModelAttribute addProductDTO: AddProductDTO): ResponseEntity<Unit> {
        productService.addProduct(addProductDTO)
        return ResponseEntity(HttpStatus.OK)
    }
}