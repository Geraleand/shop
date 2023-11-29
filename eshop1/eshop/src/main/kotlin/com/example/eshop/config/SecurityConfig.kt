package com.example.eshop.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.authentication.AuthenticationProvider
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.provisioning.JdbcUserDetailsManager
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import javax.sql.DataSource

@Configuration
@EnableWebSecurity
class SecurityConfig(
    private val dataSource: DataSource,
    private val authenticationProvider: AuthenticationProvider
) {
    @Bean
    fun user(): JdbcUserDetailsManager {
        return JdbcUserDetailsManager(dataSource)
    }


    @Bean
    fun securityFilterChain(
        http: HttpSecurity,
        jwtAuthenticationFilter: JwtAuthenticationFilter
    ): SecurityFilterChain {
        http
            .csrf { it.disable() }
            .authorizeHttpRequests {
                it
                    .requestMatchers("/loginPage**", "/loginPage/**", "/styles/css/**", "/js/**")
                    .permitAll()
                    .requestMatchers("/api/auth**")
                    .permitAll()
                    .requestMatchers("/api/admin/**")
                    .hasAuthority("ADMIN")
                    .requestMatchers("/purchase/**")
                    .hasAuthority("ADMIN")
                    .anyRequest()
                    .fullyAuthenticated()
//                    .anyRequest()
//                    .permitAll()
            }
            .sessionManagement {
                it.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            }
            .authenticationProvider(authenticationProvider)
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter::class.java)

        return http.build()
    }
}