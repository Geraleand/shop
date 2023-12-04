package com.example.eshop.controller

import com.example.eshop.entity.Purchase
import com.example.eshop.service.PurchaseService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/purchase")
class PurchaseController(
    private val purchaseService: PurchaseService
) {

    @PostMapping("/create")
    fun createPurchase() =
        purchaseService.createPurchase()

    @GetMapping("/unpaid/list")
    fun getUnpaidPurchases(): List<Purchase> =
        purchaseService.getUnpaidPurchases()

    @PutMapping("/unpaid/pay")
    fun payPurchase(@RequestBody purchaseIds: List<Long>) =
        purchaseService.payPurchases(purchaseIds)

}