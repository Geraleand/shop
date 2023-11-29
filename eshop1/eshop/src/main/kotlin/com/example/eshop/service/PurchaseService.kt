package com.example.eshop.service

import com.example.eshop.entity.Purchase
import com.example.eshop.entity.PurchaseItem
import com.example.eshop.repository.*
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class PurchaseService(
    val purchaseRepository: PurchaseRepository,
    val purchaseItemRepository: PurchaseItemRepository,
    val cartItemRepository: CartItemRepository, private val userRepository: UserRepository, private val cartRepository: CartRepository
) {

    @Transactional
    fun createPurchase(username: String) {
        val user = userRepository.findByUsernameIgnoreCase(username).orElse(null)
        val cartItems = cartItemRepository.findByCart_User_Username(username)
        var purchase = Purchase()
        purchase.user = user
        purchase = purchaseRepository.save(purchase)
        val purchaseItems = arrayListOf<PurchaseItem>()
        cartItems.forEach {
            if (it.count!! > it.product?.count!!)
                throw Exception("Count in cart is too much")
            val purchaseItem = PurchaseItem()
            purchaseItem.purchase = purchase
            purchaseItem.product = it.product
            purchaseItem.count = it.count
            purchaseItem.price = it.product?.price
            purchaseItems.add(purchaseItem)
        }
        purchaseItemRepository.saveAll(purchaseItems)
        cartRepository.deleteByUser(user)
    }
}