package com.example.eshop.controller

import com.example.eshop.service.PurchaseService
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/purchase")
class PurchaseController(
    private val purchaseService: PurchaseService
) {

    @PostMapping("/create")
    fun createPurchase() =
        purchaseService.createPurchase()
}