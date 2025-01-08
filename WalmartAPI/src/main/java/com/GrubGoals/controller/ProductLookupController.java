package com.GrubGoals.controller;

import com.GrubGoals.dto.ProductLookupResponseDTO;
import com.GrubGoals.dto.ProductLookupDTO;
import com.GrubGoals.exception.ResourceNotFoundException;
import com.GrubGoals.service.ProductLookupService;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;


/**
 * The link that will be fowarded to when searching for a product using a zip code
 */
@RestController
public class ProductLookupController {
    private final ProductLookupService productLookupService;

    public ProductLookupController(ProductLookupService productLookupService) {
        this.productLookupService = productLookupService;
    }

    @GetMapping("/product/{zipCode}/{productId}")
    public ProductLookupResponseDTO findProducts(@PathVariable String zipCode, @PathVariable String productId) {
        List<ProductLookupDTO> products = productLookupService.findProducts(zipCode, productId);
        if (products.isEmpty()) {
            throw new ResourceNotFoundException("No products found for the given product id and zip code");
        }
        ProductLookupResponseDTO response = new ProductLookupResponseDTO();
        response.setProducts(products);
        return response;
    }
}
