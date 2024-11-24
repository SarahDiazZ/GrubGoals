package com.GrubGoals.service;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;
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
        String url = "https://developer.api.walmart.com/api-proxy/service/affil/product/v2/search?query=" + query;
        String response = urlCall.callUrl(url);

        List<ItemSearchDTO> items = new ArrayList<>();
        try {
            JSONObject jsonResponse = new JSONObject(response);
            JSONArray itemsArray = jsonResponse.getJSONArray("items");

            for (int i = 0; i < itemsArray.length(); i++) {
                JSONObject itemObject = itemsArray.getJSONObject(i);
                ItemSearchDTO item = new ItemSearchDTO();
                item.setItemId(itemObject.getLong("itemId")); // Use getLong for itemId
                item.setOfferType(itemObject.getString("offerType"));
                item.setSalePrice(itemObject.getDouble("salePrice"));
                item.setName(itemObject.getString("name"));
                item.setStock(itemObject.getString("stock"));
                items.add(item);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return items;
    }
    
}
