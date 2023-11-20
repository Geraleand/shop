import io.ktor.application.*
import io.ktor.features.ContentTransformationException
import io.ktor.features.StatusPages
import io.ktor.http.HttpStatusCode
import io.ktor.request.receiveParameters
import io.ktor.response.respond
import io.ktor.routing.post
import io.ktor.routing.routing
import io.ktor.server.engine.embeddedServer
import io.ktor.server.netty.Netty
import org.jetbrains.exposed.dao.IntIdTable
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.selectAll
import org.jetbrains.exposed.sql.transactions.transaction

data class Buyer(val email: String, val password: String, val surname: String, val name: String, val birthday: String, val telephone: String)

object BuyersTable : IntIdTable() {
    val email = varchar("email", 255)
    val password = varchar("password", 255)
    val surname = varchar("surname", 255)
    val name = varchar("name", 255)
    val birthday = varchar("birthday", 255)
    val telephone = varchar("telephone", 255)
}

fun main() {
    Database.connect("jdbc:postgresql://localhost:5432/shop", driver = "org.postgresql.Driver", user = "postgres", password = "1")

    embeddedServer(Netty, port = 8080) {
        install(StatusPages) {
            exception<ContentTransformationException> { cause ->
                call.respond(HttpStatusCode.BadRequest, cause.localizedMessage)
            }
        }

        routing {
            post("/registration") {
                try {
                    val params = call.receiveParameters()
                    val buyer = Buyer(
                        params["email"]!!,
                        params["password"]!!,
                        params["surname"]!!,
                        params["name"]!!,
                        params["birthday"]!!,
                        params["telephone"]!!
                    )
                    addBuyer(buyer)
                    call.respond(HttpStatusCode.OK, "Buyer registered successfully")
                } catch (e: Exception) {
                    call.respond(HttpStatusCode.InternalServerError, "Error during registration")
                }
            }
        }
    }.start(wait = true)
}

fun addBuyer(buyer: Buyer) {
    transaction {
        BuyersTable.insert {
            it[email] = buyer.email
            it[password] = buyer.password
            it[surname] = buyer.surname
            it[name] = buyer.name
            it[birthday] = buyer.birthday
            it[telephone] = buyer.telephone
        }
    }
}
