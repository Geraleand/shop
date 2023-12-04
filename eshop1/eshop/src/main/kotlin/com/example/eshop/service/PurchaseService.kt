package com.example.eshop.service

import com.example.eshop.entity.Purchase
import com.example.eshop.entity.PurchaseItem
import com.example.eshop.repository.*
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.Instant

@Service
class PurchaseService(
    val purchaseRepository: PurchaseRepository,
    val purchaseItemRepository: PurchaseItemRepository,
    val cartItemRepository: CartItemRepository, private val userRepository: UserRepository, private val cartRepository: CartRepository,
    private val productRepository: ProductRepository
) {

    @Transactional
    fun createPurchase() {
        val username: String = SecurityContextHolder.getContext().authentication.name
        val user = userRepository.findByUsernameIgnoreCase(username).orElse(null)
        val cartItems = cartItemRepository.findByCart_User_Username(username)
        var purchase = Purchase()
        purchase.user = user
        purchase.creationDate = Instant.now()
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
            val product = productRepository.findById(it.product!!.id!!).orElse(null)
            product.count = product.count!!.minus(it.count!!)
            productRepository.save(product)
        }
        purchaseItemRepository.saveAll(purchaseItems)
        cartRepository.deleteByUser(user)
    }

    fun getUnpaidPurchases(): List<Purchase> =
        purchaseRepository.findByIsPaid(false)

    fun payPurchases(ids: List<Long>) {
        val purchases = purchaseRepository.findAllById(ids)
        purchases.forEach {
            it.isPaid = true
            it.paymentDate = Instant.now()
        }
        purchaseRepository.saveAll(purchases)
    }
}