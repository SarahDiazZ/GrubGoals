package com.GrubGoals.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.GrubGoals.URLCall;
import com.GrubGoals.dto.StoreDTO;

@Service
public class StoreLocatorService {
    private final URLCall urlCall;

    public StoreLocatorService(URLCall urlCall) {
        this.urlCall = urlCall;
    }

    public List<StoreDTO> findStores(String zipCode) {
        String url = "https://developer.api.walmart.com/api-proxy/service/affil/product/v2/stores?zip=" + zipCode;
        String response = urlCall.callUrl(url);

        List<StoreDTO> stores = new ArrayList<>();
        // Parse the response and populate the stores list
        System.out.println("Response: " + response);


        return stores;
    }
}
