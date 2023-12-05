package com.example.eshop.controller

import com.example.eshop.dto.MostValuableProductDTO
import com.example.eshop.service.AnalyticsService
import org.springframework.format.annotation.DateTimeFormat
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.*

@RestController
@RequestMapping("/analytics")
class AnalyticsController(
    private val analyticsService: AnalyticsService
) {

    @GetMapping("/income/{startDate}/{endDate}")
    fun getIncome(@PathVariable(value = "startDate")
                  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                  startDate: Date,
                  @PathVariable(value = "endDate")
                  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                  endDate: Date): Double =
        analyticsService.getIncome(startDate.toInstant(), endDate.toInstant())

    @GetMapping("/most-valuable-products")
    fun getMostValuableProducts(): ResponseEntity<List<MostValuableProductDTO>> {
        val result = analyticsService.getMostValuableProducts()
        return ResponseEntity(result, HttpStatus.OK)
    }
}