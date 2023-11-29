package com.example.eshop.service

import com.example.eshop.dto.CartItemDTO
import com.example.eshop.dto.UpdateCartRequest
import com.example.eshop.entity.CartItem
import com.example.eshop.repository.CartItemRepository
import com.example.eshop.repository.CartRepository
import com.example.eshop.repository.ProductRepository
import com.example.eshop.repository.UserRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class CartService(
    private val cartItemRepository: CartItemRepository,
    private val cartRepository: CartRepository,
    private val userRepository: UserRepository, private val productRepository: ProductRepository
) {

    fun getCartItems(username: String): List<CartItemDTO> =
        cartItemRepository.findByCart_User_Username(username).map { cartItem ->
            CartItemDTO(
                productId = cartItem.product?.id!!,
                productName = cartItem.product?.title!!,
                productPhoto = cartItem.product?.photo!!,
                count = cartItem.count!!
            )
        }

    @Transactional
    fun addToCart(cartRequest: UpdateCartRequest, username: String) {
        val cartItem = cartItemRepository.findByProduct_IdAndCart_User_Username(cartRequest.productId, username).orElse(null)
        val product = productRepository.findById(cartRequest.productId).orElse(null)
        if (cartItem != null) {
            cartItem.count = cartItem.count?.plus(cartRequest.count)
            cartItemRepository.save(cartItem)
            return
        }

        val cart = cartRepository.findByUser_Username(username)
        val user = userRepository.findByUsernameIgnoreCase(username).orElse(null)
        cart.user = user
        cartRepository.save(cart)
        val newCartItem = CartItem()
        newCartItem.cart = cart
        newCartItem.count = cartRequest.count
        newCartItem.product = product
        cartItemRepository.save(newCartItem)
    }

    @Transactional
    fun deleteFromCart(cartRequest: UpdateCartRequest, username: String) {
        val cartItem = cartItemRepository.findByProduct_IdAndCart_User_Username(cartRequest.productId, username).orElse(null)
        cartItem.count = cartItem.count?.minus(cartRequest.count)
        if (cartItem.count!! > 0) {
            cartItemRepository.save(cartItem)
            return
        }
        cartItemRepository.delete(cartItem)

        if (cartItemRepository.existsByCart_User_Username(username))
            return

        val cart = cartRepository.findByUser_Username(username)
        cartRepository.delete(cart)
    }


}