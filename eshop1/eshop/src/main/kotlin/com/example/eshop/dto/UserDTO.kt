package com.example.eshop.dto

data class UserDTO(
    val username: String? = null,
    val password: String? = null,
    val lastName: String,
    val firstName: String,
    val email: String,
    val phone: String,
    val id: Long? = null
)
