package com.example.eshop.controller

import com.example.eshop.dto.AddProductDTO
import com.example.eshop.dto.CatalogDTO
import com.example.eshop.dto.UserDTO
import com.example.eshop.entity.User
import com.example.eshop.service.CatalogService
import com.example.eshop.service.ProductService
import com.example.eshop.service.UserService
import jakarta.servlet.http.HttpServletRequest
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/catalog")
class CatalogController(
    private val catalogService: CatalogService
) {

    @GetMapping("/all")
    fun getAllProducts(): ResponseEntity<List<CatalogDTO>> {
        val products = catalogService.getAllProducts()
        return ResponseEntity(products, HttpStatus.OK)
    }
}