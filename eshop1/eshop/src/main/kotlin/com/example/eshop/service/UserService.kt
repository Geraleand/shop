package com.example.eshop.service

import com.example.eshop.dto.UserDTO
import com.example.eshop.entity.Authority
import com.example.eshop.entity.User
import com.example.eshop.repository.AuthorityRepository
import com.example.eshop.repository.UserRepository
import org.springframework.security.core.context.SecurityContextHolder
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
    fun addUser(userDTO: UserDTO, newAuthority: String): UserDTO {
        if (userRepository.existsByUsernameIgnoreCase(userDTO.username!!))
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
        authority.authority = newAuthority
        authorityRepository.save(authority)
        return mapUserToDTO(savedUser)!!
    }

    @Transactional
    fun updateUser(userDTO: UserDTO): UserDTO {
        val oldUser = userRepository.findById(userDTO.id!!).orElse(null)
        if (oldUser == null)
            throw Exception("user does not exists")
        oldUser.email = userDTO.email
        oldUser.phone = userDTO.phone
        oldUser.firstName = userDTO.firstName
        oldUser.lastName = userDTO.lastName
        val newUser = userRepository.save(oldUser)
        return mapUserToDTO(newUser)!!
    }

    fun getManagerList(): List<UserDTO> {
        val authorities = authorityRepository.findByAuthority("SELLER")
        val userList = authorities.map { it.user!! }
        return userList.map { mapUserToDTO(it)!! }
    }

    fun getUser(id: Long): UserDTO {
        return mapUserToDTO(userRepository.findById(id).orElse(null))!!
    }

    @Transactional
    fun deleteUser(id: Long) {
        val user = userRepository.findById(id).orElse(null)
        userRepository.delete(user)
        authorityRepository.deleteByUser(user)
    }

    fun getUserFromContext():User {
        val username: String = SecurityContextHolder.getContext().authentication.name
        return userRepository.findByUsernameIgnoreCase(username).orElse(null)
    }


    private fun mapUserToDTO(user: User?): UserDTO? {
        if (user == null)
            return null
        return UserDTO(
            username = user.username!!,
            lastName = user.lastName!!,
            firstName = user.firstName!!,
            email = user.email!!,
            phone = user.phone!!,
            id = user.id
        )
    }

}