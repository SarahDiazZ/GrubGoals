package com.GrubGoals.service;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import com.GrubGoals.URLCall;
import com.GrubGoals.dto.ItemSearchDTO;
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
        try {
            JSONArray storesArray = new JSONArray(response);

            for (int i = 0; i < storesArray.length(); i++) {
                JSONObject storeObject = storesArray.getJSONObject(i);
                StoreDTO store = new StoreDTO();
                store.setStoreId(storeObject.getInt("no"));
                store.setStoreName(storeObject.getString("name"));
                store.setAddress(storeObject.getString("streetAddress"));
                store.setCity(storeObject.getString("city"));
                store.setZipCode(storeObject.getString("zip"));
                stores.add(store);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return stores;
    }
}
