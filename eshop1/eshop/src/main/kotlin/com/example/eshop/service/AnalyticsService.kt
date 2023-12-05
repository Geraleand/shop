package com.example.eshop.service

import com.example.eshop.dto.MostValuableProductDTO
import com.example.eshop.repository.PurchaseItemRepository
import org.springframework.stereotype.Service
import java.time.Instant

@Service
class AnalyticsService(
    private val purchaseItemRepository: PurchaseItemRepository
) {

    fun getIncome(startDate: Instant, endDate: Instant): Double {
        return purchaseItemRepository.getIncome(startDate, endDate)
    }

    fun getMostValuableProducts(): List<MostValuableProductDTO> {
        val products = purchaseItemRepository.getMostValuableProducts()
        return products.map {
            val income = purchaseItemRepository.getProductIncome(it.id!!)
            return@map MostValuableProductDTO(
                productId = it.id!!,
                productName = it.title!!,
                productArticle = it.article!!,
                categoryId = it.category!!.id!!,
                categoryName = it.category!!.name!!,
                income = income
            )
        }
    }
}