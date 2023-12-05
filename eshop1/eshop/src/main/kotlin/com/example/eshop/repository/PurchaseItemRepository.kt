package com.example.eshop.repository;

import com.example.eshop.entity.Product
import com.example.eshop.entity.PurchaseItem
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import java.time.Instant

interface PurchaseItemRepository : JpaRepository<PurchaseItem, Long> {

    fun findByPurchase_Id(id: Long): List<PurchaseItem>

    @Query("select sum(i.price * i.count) from Purchase p join PurchaseItem i on p.id = i.purchase.id where p.creationDate between ?1 and ?2")
    fun getIncome(startDate: Instant, endDate: Instant): Double

    @Query("select p from PurchaseItem i join Product p on i.product.id = p.id group by p order by sum(i.count * i.price) desc limit 3")
    fun getMostValuableProducts(): List<Product>

    @Query("select sum(p.price * p.count) from PurchaseItem p where p.product.id = ?1")
    fun getProductIncome( id: Long): Double

}