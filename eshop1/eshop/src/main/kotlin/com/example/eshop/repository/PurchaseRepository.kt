package com.example.eshop.repository;

import com.example.eshop.entity.Purchase
import com.example.eshop.entity.User
import org.springframework.data.jpa.repository.JpaRepository

interface PurchaseRepository : JpaRepository<Purchase, Long> {


    fun findByIsPaid(isPaid: Boolean): List<Purchase>


    fun findByUser(user: User): List<Purchase>
}