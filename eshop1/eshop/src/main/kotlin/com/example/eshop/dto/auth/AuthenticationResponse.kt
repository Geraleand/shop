package com.example.eshop.dto.auth

data class AuthenticationResponse(
    val token: String,
    val refreshToken: String,
    val authority: String
)
