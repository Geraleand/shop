package com.example.eshop.service

import com.example.eshop.dto.PurchaseDTO
import com.example.eshop.dto.PurchaseItemDTO
import com.example.eshop.entity.Purchase
import com.example.eshop.entity.PurchaseItem
import com.example.eshop.repository.*
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.Instant

@Service
class PurchaseService(
    val purchaseRepository: PurchaseRepository,
    val purchaseItemRepository: PurchaseItemRepository,
    val cartItemRepository: CartItemRepository,
    private val userRepository: UserRepository,
    private val cartRepository: CartRepository,
    private val productRepository: ProductRepository,
    private val userService: UserService
) {

    @Transactional
    fun createPurchase() {
        val user = userService.getUserFromContext()
        val cartItems = cartItemRepository.findByCart_User_Username(user.username!!)
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

    fun getUserPurchases(): List<PurchaseDTO> {
        val user = userService.getUserFromContext()
        val purchases = purchaseRepository.findByUser(user)
        val purchaseDTOs = purchases.map {
            val items = purchaseItemRepository.findByPurchase_Id(it.id!!)
            return@map mapPurchaseToDTO(it, items)
        }
        return purchaseDTOs
    }

    private fun mapPurchaseToDTO(purchase: Purchase, items: List<PurchaseItem>): PurchaseDTO {
        return PurchaseDTO(
            id = purchase.id!!,
            userId = purchase.id!!,
            creationDate = purchase.creationDate!!,
            isPaid = purchase.isPaid!!,
            paymentDate = purchase.paymentDate,
            items = items.map {
                PurchaseItemDTO(
                    purchaseId = purchase.id!!,
                    productId = it.product!!.id!!,
                    productName = it.product!!.title!!,
                    productArticle = it.product!!.article!!,
                    categoryId = it.product!!.category!!.id!!,
                    categoryName = it.product!!.category!!.name!!,
                    count = it.count!!,
                    price = it.price!!
                )
            }
        )
    }

    fun payPurchases(ids: List<Long>) {
        val purchases = purchaseRepository.findAllById(ids)
        purchases.forEach {
            it.isPaid = true
            it.paymentDate = Instant.now()
        }
        purchaseRepository.saveAll(purchases)
    }
}