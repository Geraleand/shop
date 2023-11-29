package com.example.eshop.service

import com.example.eshop.dto.AddProductDTO
import com.example.eshop.dto.UserDTO
import com.example.eshop.entity.Authority
import com.example.eshop.entity.Category
import com.example.eshop.entity.Product
import com.example.eshop.entity.User
import com.example.eshop.repository.AuthorityRepository
import com.example.eshop.repository.CategoryRepository
import com.example.eshop.repository.ProductRepository
import com.example.eshop.repository.UserRepository
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.nio.file.Files
import java.nio.file.Paths
import java.util.*

@Service
class ProductService(
    private val productRepository: ProductRepository,
    private val categoryRepository: CategoryRepository,
) {

    @Transactional
    fun addProduct(addProductDTO: AddProductDTO) {
        val product = Product()
        product.title = addProductDTO.title
        product.article = addProductDTO.article
        product.price = addProductDTO.price
        product.quantity = addProductDTO.quantity
        product.supplier = addProductDTO.supplier

        // Используйте ваш репозиторий для поиска категории по имени
        val categoryOptional: Optional<Category> = categoryRepository.findByTitleIgnoreCase(addProductDTO.category)

        // Проверка, существует ли категория
        val category: Category = if (categoryOptional.isPresent) {
            categoryOptional.get()
        } else {
            // Если категория не существует, создайте новую
            val newCategory = Category()
            newCategory.title = addProductDTO.category
            categoryRepository.save(newCategory)
            newCategory
        }

        product.category = category

        // Сохранение изображения на сервере и путь к нему в базе данных
        val fileName = addProductDTO.photo.originalFilename
        //val filePath = Paths.get("C:\\Users\\StrixG513QM\\IdeaProjects\\shop\\eshop1\\eshop\\font\\image", fileName).toAbsolutePath().toString()
        val relativePath = Paths.get("eshop1", "eshop", "font", "image", fileName).toString()
        val filePath = Paths.get(System.getProperty("user.dir"), relativePath).toAbsolutePath().toString()

        Files.copy(addProductDTO.photo.inputStream, Paths.get(filePath))

        product.photo = filePath

        productRepository.save(product)

    }
    }