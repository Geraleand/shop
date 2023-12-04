package com.example.eshop.repository;

import com.example.eshop.entity.Authority
import com.example.eshop.entity.User
import org.springframework.data.jpa.repository.JpaRepository

interface AuthorityRepository : JpaRepository<Authority, Long> {

    fun findByAuthority(authority: String): List<Authority>


    fun findByUser_UsernameIgnoreCase(username: String): Authority?


    fun deleteByUser(user: User): Long
}