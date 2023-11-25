package com.example.eshop.controller

import com.example.eshop.dto.LoginDTO
import com.example.eshop.service.UserService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class LoginController(
    val userService: UserService
) {

    @PostMapping("/login")
    fun login(@RequestBody loginDTO: LoginDTO): ResponseEntity<Unit> {
        val httpStatus = if (userService.isLoginCorrect(loginDTO.username, loginDTO.password))
            HttpStatus.OK
        else HttpStatus.UNAUTHORIZED

        return ResponseEntity(httpStatus)
    }
}