package com.example.eshop.repository;

import com.example.eshop.entity.PurchaseItem
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import java.time.Instant

interface PurchaseItemRepository : JpaRepository<PurchaseItem, Long> {

    fun findByPurchase_Id(id: Long): List<PurchaseItem>

    @Query("select sum(i.price * i.count) from Purchase p join PurchaseItem i on p.id = i.purchase.id where p.creationDate between ?1 and ?2")
    fun getIncome(startDate: Instant, endDate: Instant): Double

}