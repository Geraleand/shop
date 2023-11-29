package com.example.eshop.entity

import jakarta.persistence.*
import org.hibernate.annotations.OnDelete
import org.hibernate.annotations.OnDeleteAction

@Entity
@Table(name = "products", schema = "public")
open class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    open var id: Long? = null

    @Column(name = "title", nullable = false, length = Integer.MAX_VALUE)
    open var title: String? = null

    @Column(name = "article", nullable = false, length = Integer.MAX_VALUE)
    open var article: String? = null

    @Column(name = "photo")
    open var photo: ByteArray? = null

    @Column(name = "count", nullable = false)
    open var count: Int? = null

    @Column(name = "supplier", length = Integer.MAX_VALUE)
    open var supplier: String? = null

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "category_id")
    open var category: Category? = null

    @Column(name = "price", nullable = false)
    open var price: Double? = null
}