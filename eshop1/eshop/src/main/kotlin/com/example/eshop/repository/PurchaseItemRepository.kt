package com.example.eshop.repository;

import com.example.eshop.entity.PurchaseItem
import org.springframework.data.jpa.repository.JpaRepository

interface PurchaseItemRepository : JpaRepository<PurchaseItem, Long> {
}