package com.GrubGoals.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.GrubGoals.URLCall;
import com.GrubGoals.dto.ProductLookupDTO;

public class ProductLookupService {
    private final URLCall urlCall;

    public ProductLookupService(URLCall urlCall) {
        this.urlCall = urlCall;
    }

    public List<ProductLookupDTO> findProducts(String zipCode, String productId) {
        String url = "https://developer.api.walmart.com/api-proxy/service/affil/product/v2/items?ids=" + productId + "&zipCode=" + zipCode;
        String response = urlCall.callUrl(url);

        List<ProductLookupDTO> products = new ArrayList<>();
        // Parse the response and populate the products list
        System.out.println("Response: " + response);

        return products;
    }
    
}
