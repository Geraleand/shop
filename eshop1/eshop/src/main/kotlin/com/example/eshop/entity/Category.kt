package com.example.eshop.entity

import jakarta.persistence.*

@Entity
@Table(name = "categories")
open class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    open var id: Long? = null

    @Column(name = "name", nullable = false, length = Integer.MAX_VALUE)
    open var name: String? = null
}