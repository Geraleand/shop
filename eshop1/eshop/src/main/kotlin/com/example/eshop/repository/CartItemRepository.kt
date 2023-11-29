package com.example.eshop.repository;

import com.example.eshop.entity.CartItem
import org.springframework.data.jpa.repository.JpaRepository
import java.util.*

interface CartItemRepository : JpaRepository<CartItem, Long> {


    fun findByProduct_IdAndCart_User_Username(id: Long, username: String): Optional<CartItem>

    fun existsByCart_User_Username(username: String): Boolean


    fun findByCart_User_Username(username: String): List<CartItem>


}