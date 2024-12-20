package com.GrubGoals.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.GrubGoals.URLCall;
import com.GrubGoals.dto.ItemSearchDTO;


/**
 * Specific link that is being used by the Walmart API and the query needed
 */
@Service
public class ItemSearchService {
    private final URLCall urlCall;

    public ItemSearchService(URLCall urlCall) {
        this.urlCall = urlCall;
    }

    public List<ItemSearchDTO> searchItems(String query) {
        String url = "https://developer.api.walmart.com/api-proxy/service/affil/product/v2/search?query=" + query;
        String response = urlCall.callUrl(url);

        List<ItemSearchDTO> items = new ArrayList<>();
        System.out.println("Response: " + response);

        return items;
    }
    
}