package com.example.eshop.entity

import jakarta.persistence.*

@Entity
@Table(name = "users", schema = "public")
open class User {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    open var id: String? = null

    @Column(name = "username", nullable = false)
    open var username: String? = null

    @Column(name = "password")
    open var password: String? = null

    @Column(name = "email", nullable = false, length = Integer.MAX_VALUE)
    open var email: String? = null

    @Column(name = "first_name", nullable = false, length = Integer.MAX_VALUE)
    open var firstName: String? = null

    @Column(name = "last_name", nullable = false, length = Integer.MAX_VALUE)
    open var lastName: String? = null

    @Column(name = "phone", nullable = false, length = Integer.MAX_VALUE)
    open var phone: String? = null

    @Column(name = "enabled")
    open var enabled: Boolean? = null
}