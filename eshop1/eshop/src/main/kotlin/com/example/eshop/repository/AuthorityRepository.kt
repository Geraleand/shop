package com.example.eshop.repository;

import com.example.eshop.entity.Authority
import org.springframework.data.jpa.repository.JpaRepository

interface AuthorityRepository : JpaRepository<Authority, Long> {


    fun findByUser_UsernameIgnoreCase(username: String): Authority?


}