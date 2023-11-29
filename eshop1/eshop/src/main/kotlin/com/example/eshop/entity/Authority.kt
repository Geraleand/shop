package com.example.eshop.entity

import jakarta.persistence.*

@Entity
@Table(name = "authorities")
open class Authority {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    open var id: Long? = null

    @OneToOne(fetch = FetchType.LAZY, cascade = [CascadeType.ALL])
    @JoinColumn(name = "username", referencedColumnName = "username")
    open var user: User? = null

    @Column(name = "authority", length = Integer.MAX_VALUE)
    open var authority: String? = null
}