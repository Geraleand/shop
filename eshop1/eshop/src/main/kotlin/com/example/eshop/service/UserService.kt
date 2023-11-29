package com.example.eshop.service

import com.example.eshop.dto.UserDTO
import com.example.eshop.entity.Authority
import com.example.eshop.entity.User
import com.example.eshop.repository.AuthorityRepository
import com.example.eshop.repository.UserRepository
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class UserService(
    private val userRepository: UserRepository,
    private val authorityRepository: AuthorityRepository,
    private val encoder: PasswordEncoder
) {

    fun getUsers(): List<User> {
        return userRepository.findAll();
    }

    @Transactional
    fun addUser(userDTO: UserDTO) {
        if (userRepository.existsByUsernameIgnoreCase(userDTO.username))
            throw Exception("user already exists")
        val user = User()
        user.username = userDTO.username
        user.password = encoder.encode(userDTO.password)
        user.firstName = userDTO.firstName
        user.lastName = userDTO.lastName
        user.email = userDTO.email
        user.phone = userDTO.phone
        val savedUser = userRepository.save(user)
        val authority = Authority()
        authority.user = savedUser
        authority.authority = "CLIENT"
        authorityRepository.save(authority)
    }

}