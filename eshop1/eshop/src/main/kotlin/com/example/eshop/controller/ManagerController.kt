package com.example.eshop.controller

import com.example.eshop.dto.UserDTO
import com.example.eshop.service.UserService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/manager")
class ManagerController(
    val userService: UserService
) {

    @GetMapping("/list")
    fun getManagerList(): List<UserDTO> {
        return userService.getManagerList()
    }

    @GetMapping("/one/{userID}")
    fun getManager(@PathVariable(value = "userID") id: Long): UserDTO {
        return userService.getUser(id)
    }

    @PostMapping("/create")
    fun createManager(@RequestBody manager: UserDTO): UserDTO {
        return userService.addUser(manager, "SELLER")
    }

    @PutMapping("/update")
    fun updateManager(@RequestBody manager: UserDTO): UserDTO {
        return userService.updateUser(manager)
    }

    @DeleteMapping("/delete/{userId}")
    fun deleteManager(@PathVariable(value = "userId") id: Long): ResponseEntity<Unit> {
        userService.deleteUser(id)
        return ResponseEntity(HttpStatus.OK)
    }
}