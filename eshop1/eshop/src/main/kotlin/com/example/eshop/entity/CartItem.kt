package com.example.eshop.entity

import jakarta.persistence.*

@Entity
@Table(name = "cart_items")
open class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    open var id: Long? = null

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    open var product: Product? = null

    @Column(name = "count", nullable = false)
    open var count: Int? = null
}