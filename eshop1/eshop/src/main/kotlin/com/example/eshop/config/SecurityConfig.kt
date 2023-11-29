package com.example.eshop.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.annotation.Order
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.invoke
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.provisioning.JdbcUserDetailsManager
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.csrf.CookieCsrfTokenRepository
import org.springframework.security.web.csrf.CsrfTokenRepository
import javax.sql.DataSource

@Configuration
@EnableWebSecurity
class SecurityConfig(
    private val dataSource: DataSource
) {
    @Bean
    fun user(): JdbcUserDetailsManager {
        return JdbcUserDetailsManager(dataSource)
    }


    @Bean
    @Order(1)
    fun publicFilterChain(http: HttpSecurity): SecurityFilterChain {
        http {

//            securityMatcher("/user/**")
//            authorizeHttpRequests {
//                authorize(anyRequest, permitAll)
//            }
//            formLogin { permitAll() }

            csrf { disable() }

        }
        return http.build()
    }

//    @Bean
//    fun securityFilter(http: HttpSecurity): SecurityFilterChain {
//        http {
//            securityMatcher("/admin/**")
//            authorizeHttpRequests {
//                authorize(anyRequest, hasAuthority("ADMIN"))
//            }
//
//            httpBasic {  }
//        }
//
//        return http.build()
//    }

    @Bean
    fun csrfTokenRepository(): CsrfTokenRepository {
        val cookieCsrfTokenRepository = CookieCsrfTokenRepository()
        cookieCsrfTokenRepository.cookiePath ="/"
        return cookieCsrfTokenRepository
    }

    @Bean
    fun passwordEncoder(): PasswordEncoder {
        return BCryptPasswordEncoder(12)
    }
}