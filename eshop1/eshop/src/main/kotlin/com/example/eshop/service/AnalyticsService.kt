package com.example.eshop.service

import com.example.eshop.repository.PurchaseItemRepository
import org.springframework.stereotype.Service
import java.time.Instant

@Service
class AnalyticsService(private val purchaseItemRepository: PurchaseItemRepository) {

    fun getIncome(startDate: Instant, endDate: Instant): Double {
        return purchaseItemRepository.getIncome(startDate, endDate)
    }
}