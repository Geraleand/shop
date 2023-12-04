package com.example.eshop.repository;

import com.example.eshop.entity.User
import org.springframework.data.jpa.repository.JpaRepository
import java.util.*

interface UserRepository : JpaRepository<User, Long> {

    fun findByUsernameIgnoreCase(username: String): Optional<User>

    fun existsByUsernameIgnoreCase(username: String): Boolean


}