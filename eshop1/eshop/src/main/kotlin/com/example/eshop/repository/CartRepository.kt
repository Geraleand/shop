package com.example.eshop.repository;

import com.example.eshop.entity.Cart
import com.example.eshop.entity.User
import org.springframework.data.jpa.repository.JpaRepository
import java.util.*

interface CartRepository : JpaRepository<Cart, Long> {

    fun deleteByUser(user: User): Long


    fun findByUser_Username(username: String): Optional<Cart>
}