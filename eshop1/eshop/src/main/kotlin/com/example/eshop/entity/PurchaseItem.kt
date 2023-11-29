package com.example.eshop.entity

import jakarta.persistence.*

@Entity
@Table(name = "purchase_items")
open class PurchaseItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    open var id: Long? = null

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "purchase_id", nullable = false)
    open var purchase: Purchase? = null

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    open var product: Product? = null

    @Column(name = "count", nullable = false)
    open var count: Int? = null

    @Column(name = "price", nullable = false)
    open var price: Double? = null
}