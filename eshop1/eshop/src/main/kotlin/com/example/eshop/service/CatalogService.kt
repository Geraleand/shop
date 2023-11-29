import com.example.eshop.dto.AddProductDTO
import com.example.eshop.dto.CatalogDTO
import com.example.eshop.entity.Product
import com.example.eshop.repository.CategoryRepository
import com.example.eshop.repository.ProductRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional


@Service
class CatalogService(
    private val productRepository: ProductRepository,
    private val categoryRepository: CategoryRepository
) {

    @Transactional(readOnly = true)
    fun getAllProducts(): List<Product> {
        val products = productRepository.findAll()
    }
}