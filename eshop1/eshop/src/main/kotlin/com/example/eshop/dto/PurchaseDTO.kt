package com.example.eshop.dto

import java.time.Instant

data class PurchaseDTO(
    val id: Long,
    val userId: Long,
    val creationDate: Instant,
    val isPaid: Boolean,
    val paymentDate: Instant? = null,
    val items: List<PurchaseItemDTO>
)
