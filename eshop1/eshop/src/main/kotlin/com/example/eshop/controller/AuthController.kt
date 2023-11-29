package com.example.eshop.controller

import com.example.eshop.dto.auth.AuthenticationRequest
import com.example.eshop.dto.auth.AuthenticationResponse
import com.example.eshop.dto.auth.RefreshTokenRequest
import com.example.eshop.dto.auth.RefreshTokenResponse
import com.example.eshop.service.security.AuthenticationService
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(maxAge = 3600)
class AuthController(
    private val authenticationService: AuthenticationService
) {
    @PostMapping
    fun authenticate(
        @RequestBody authRequest: AuthenticationRequest
    ): AuthenticationResponse =
        authenticationService.authentication(authRequest)

    @PostMapping("/refresh")
    fun refreshAccessToken(
        @RequestBody request: RefreshTokenRequest
    ): RefreshTokenResponse =
        authenticationService.refreshAccessToken(request.token)
            ?.mapToTokenResponse()
            ?: throw ResponseStatusException(HttpStatus.FORBIDDEN, "Invalid refresh token.")

    private fun String.mapToTokenResponse(): RefreshTokenResponse =
        RefreshTokenResponse(
            token = this
        )
}