package com.example.eshop.dto.auth

data class AuthenticationResponse(
    val accessToken: String,
    val refreshToken: String,
    val role: String
)
