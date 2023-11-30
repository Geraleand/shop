package com.example.eshop.controller

import com.example.eshop.dto.UserDTO
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

    @GetMapping("/update")
    fun getUserInfo(request: HttpServletRequest): ResponseEntity<UserDTO> {
        val usernameCookie = getCookieValue(request, "username")

        if (usernameCookie != null) {
            val userDTO = userService.getUserDTOByUsername(usernameCookie)
            if (userDTO != null) {
                return ResponseEntity.ok(userDTO)
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()
    }

    private fun getCookieValue(request: HttpServletRequest, cookieName: String): String? {
        val cookies = request.cookies
        if (cookies != null) {
            for (cookie in cookies) {
                if (cookie.name == cookieName) {
                    return cookie.value
                }
            }
        }
        return null
    }
}