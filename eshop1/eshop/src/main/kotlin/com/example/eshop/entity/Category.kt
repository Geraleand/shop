package com.example.eshop.entity

import jakarta.persistence.*

@Entity
@Table(name = "categories")
open class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    open var id: Long? = null

    @Column(name = "title", nullable = false)
    open var title: String? = null
}