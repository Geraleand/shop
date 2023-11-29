package com.example.eshop.service.security

import com.example.eshop.entity.Authority
import com.example.eshop.repository.AuthorityRepository
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service


@Service
class CustomUserDetailsService(
    private val authorityRepository: AuthorityRepository
) : UserDetailsService {

    override fun loadUserByUsername(username: String): UserDetails {
        val authority = authorityRepository.findByUser_UsernameIgnoreCase(username)
            ?: throw UsernameNotFoundException("User not found!")
        return mapToUserDetails(authority)
    }

    private fun mapToUserDetails(authority: Authority): UserDetails =
        User.builder()
            .username(authority.user?.username)
            .password(authority.user?.password)
            .authorities(authority.authority)
            .build()
}