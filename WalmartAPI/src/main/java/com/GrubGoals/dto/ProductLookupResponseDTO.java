package com.GrubGoals.dto;

import java.util.List;

public class ProductLookupResponseDTO {
    private List<ProductLookupDTO> products;

    public List<ProductLookupDTO> getProducts() {
        return products;
    }

    public void setProducts(List<ProductLookupDTO> products) {
        this.products = products;
    }
}
