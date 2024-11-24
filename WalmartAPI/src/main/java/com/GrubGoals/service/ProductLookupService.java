package com.GrubGoals.service;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import com.GrubGoals.URLCall;
import com.GrubGoals.dto.ProductLookupDTO;

@Service
public class ProductLookupService {
    private final URLCall urlCall;

    public ProductLookupService(URLCall urlCall) {
        this.urlCall = urlCall;
    }

    public List<ProductLookupDTO> findProducts(String zipCode, String productId) {
        String url = "https://developer.api.walmart.com/api-proxy/service/affil/product/v2/items?ids=" + productId + "&zipCode=" + zipCode;
        String response = urlCall.callUrl(url);

        List<ProductLookupDTO> products = new ArrayList<>();
        try {
            JSONObject jsonResponse = new JSONObject(response);
            JSONArray itemsArray = jsonResponse.getJSONArray("items");

            for (int i = 0; i < itemsArray.length(); i++) {
                JSONObject itemObject = itemsArray.getJSONObject(i);
                ProductLookupDTO product = new ProductLookupDTO();
                product.setItemId(itemObject.getLong("itemId")); // Use getLong for itemId
                product.setOfferType(itemObject.getString("offerType"));
                product.setSalePrice(itemObject.getDouble("salePrice"));
                product.setName(itemObject.getString("name"));
                product.setStock(itemObject.getString("stock"));
                products.add(product);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return products;
    }
    
}
