package com.example.eshop.controller

import com.example.eshop.entity.User
import com.example.eshop.service.UserService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/admin")
class AdminController(
    private val userService: UserService
) {

    @GetMapping("get-users")
    fun getUsers(): List<User> = userService.getUsers()
}