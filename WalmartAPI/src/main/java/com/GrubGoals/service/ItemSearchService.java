package com.GrubGoals.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.GrubGoals.URLCall;
import com.GrubGoals.dto.ItemSearchDTO;

@Service
public class ItemSearchService {
    private final URLCall urlCall;

    public ItemSearchService(URLCall urlCall) {
        this.urlCall = urlCall;
    }

    public List<ItemSearchDTO> searchItems(String query) {
        String url = "https://www.walmart.com/search/api/preso?query=" + query;
        String response = urlCall.callUrl(url);

        List<ItemSearchDTO> items = new ArrayList<>();
        // Parse the response and populate the items list
        System.out.println("Response: " + response);

        return items;
    }
    
}
