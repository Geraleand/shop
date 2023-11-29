package com.example.eshop.entity

import jakarta.persistence.*

@Entity
@Table(name = "products", schema = "public")
open class Product {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    open var id: Long? = null

    @Column(name = "title", nullable = false)
    open var title: String? = null

    @Column(name = "article", nullable = false)
    open var article: String? = null

    @Column(name = "photo", nullable = false)
    open var photo: String? = null

    @Column(name = "price", nullable = false)
    open var price: Double? = null

    @Column(name = "quantity", nullable = false)
    open var quantity: Int? = null

    @Column(name = "supplier", nullable = false)
    open var supplier: String? = null

    @ManyToOne(fetch = FetchType.LAZY, cascade = [CascadeType.ALL])
    @JoinColumn(name = "category", referencedColumnName = "title")
    open var category: Category? = null
}
