package com.example.eshop.config

import org.springframework.boot.context.properties.ConfigurationProperties

@ConfigurationProperties("jwt")
data class JwtProperties(
    val accessTokenExpiration: Long,
    val refreshTokenExpiration: Long,
)
