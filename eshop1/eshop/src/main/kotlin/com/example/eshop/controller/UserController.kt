package com.example.eshop.controller

import com.example.eshop.dto.UserDTO
import com.example.eshop.service.UserService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/user")
class UserController(
    private val userService: UserService
) {

    @PostMapping("/sign-up")
    fun signUp(@RequestBody userDTO: UserDTO): ResponseEntity<Unit> {
        userService.addUser(userDTO, "CLIENT")
        return ResponseEntity(HttpStatus.OK)
    }
}