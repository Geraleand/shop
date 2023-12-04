package com.example.eshop.entity

import jakarta.persistence.*
import java.time.Instant

@Entity
@Table(name = "purchase")
open class Purchase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    open var id: Long? = null

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    open var user: User? = null

    @Column(name = "creation_date", nullable = false)
    open var creationDate: Instant? = null

    @Column(name = "is_paid", nullable = false)
    open var isPaid: Boolean? = false

    @Column(name = "payment_date")
    open var paymentDate: Instant? = null
}