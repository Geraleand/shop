package com.example.eshop.service

import com.example.eshop.dto.ProductDTO
import com.example.eshop.entity.Product
import com.example.eshop.repository.CategoryRepository
import com.example.eshop.repository.ProductRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class ProductsService(
    private val productRepository: ProductRepository,
    private val categoryRepository: CategoryRepository
) {

    fun getOneProduct(id: Long): ProductDTO {
        val product = productRepository.findById(id).orElse(null)
        return mapProductToDTO(product)
    }

    fun getProducts(): List<ProductDTO> =
        productRepository.findAll().map { mapProductToDTO(it) }

    fun createProduct(productDTO: ProductDTO): ProductDTO {
        val category = categoryRepository.findById(productDTO.categoryId).orElse(null)
        val product = Product()
        product.count = productDTO.availableCount
        product.category = category
        product.photo = productDTO.photo?.bytes
        product.title = productDTO.name
        product.article = productDTO.article
        product.price = productDTO.price
        product.supplier = productDTO.supplier
        return mapProductToDTO(productRepository.save(product))
    }

    @Transactional
    fun updateProduct(productDTO: ProductDTO): ProductDTO {
        val category = categoryRepository.findById(productDTO.categoryId).orElse(null)
        val oldProduct = productRepository.findById(productDTO.id!!).orElse(null)
        oldProduct.count = productDTO.availableCount
        oldProduct.category = category
        oldProduct.photo = productDTO.photo?.bytes
        oldProduct.title = productDTO.name
        oldProduct.article = productDTO.article
        oldProduct.price = productDTO.price
        oldProduct.supplier = productDTO.supplier
        return mapProductToDTO(productRepository.save(oldProduct))
    }

    fun deleteProduct(id: Long) {
        productRepository.deleteById(id)
    }


    fun mapProductToDTO(product: Product): ProductDTO {
        return ProductDTO(
            id = product.id,
            name = product.title!!,
            outputPhoto = product.photo,
            availableCount = product.count!!,
            categoryId = product.category?.id!!,
            categoryName = product.category?.name!!,
            supplier = product.supplier!!,
            article = product.article!!,
            price = product.price!!
        )
    }
}