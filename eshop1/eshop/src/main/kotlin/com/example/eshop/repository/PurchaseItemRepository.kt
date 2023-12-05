package com.example.eshop.repository;

import com.example.eshop.entity.PurchaseItem
import com.example.eshop.entity.User
import org.springframework.data.jpa.repository.JpaRepository

interface PurchaseItemRepository : JpaRepository<PurchaseItem, Long> {


    fun findByPurchase_User(user: User): List<PurchaseItem>


    fun findByPurchase_Id(id: Long): List<PurchaseItem>
}