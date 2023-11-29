package com.example.eshop.controller

import com.example.eshop.dto.UpdateCartRequest
import com.example.eshop.service.CartService
import org.springframework.web.bind.annotation.*
import java.security.Principal

@RestController
@RequestMapping("/cart")
class CartController(
    private val cartService: CartService
) {
    @GetMapping
    fun getCart(principal: Principal) =
        cartService.getCartItems(principal.name)

    @PostMapping("/add-item")
    fun addToCart(@RequestBody cartRequest: UpdateCartRequest, principal: Principal) =
        cartService.addToCart(cartRequest, principal.name)

    @DeleteMapping("delete-item")
    fun deleteFromCart(@RequestBody cartRequest: UpdateCartRequest, principal: Principal) =
        cartService.deleteFromCart(cartRequest, principal.name)
}