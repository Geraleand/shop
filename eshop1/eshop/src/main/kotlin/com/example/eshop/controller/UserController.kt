package com.example.eshop.controller

import com.example.eshop.dto.UserDTO
import com.example.eshop.entity.User
import com.example.eshop.service.UserService
import jakarta.servlet.http.HttpServletRequest
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/user")
class UserController(
    private val userService: UserService
) {

    @PostMapping("/sign-up")
    fun signUp(@RequestBody userDTO: UserDTO): ResponseEntity<Unit> {
        userService.addUser(userDTO)
        return ResponseEntity(HttpStatus.OK)
    }

    @GetMapping("get-users")
    fun getUsers(): List<User> {
        val users = userService.getUsers()
        return users
    }
}