package com.GrubGoals.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.GrubGoals.URLCall;
import com.GrubGoals.dto.StoreDTO;

public class StoreLocatorService {
    private final URLCall urlCall;

    public StoreLocatorService(URLCall urlCall) {
        this.urlCall = urlCall;
    }

    public List<StoreDTO> findStores(String zipCode) {
        String url = "https://www.walmart.com/store/finder/electrode/api/stores?singleLineAddr=" + zipCode;
        String response = urlCall.callUrl(url);

        List<StoreDTO> stores = new ArrayList<>();
        // Parse the response and populate the stores list
        System.out.println("Response: " + response);


        return stores;
    }
}
