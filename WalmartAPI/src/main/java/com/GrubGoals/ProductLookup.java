package com.GrubGoals;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;

public class ProductLookup {
    public void findProductWithZip(String zipCode, String productId) {
        URLCall urlCall = new URLCall();

        System.out.println("Finding product...");
        String url = "https://developer.api.walmart.com/api-proxy/service/affil/product/v2/items?ids=" + productId + "&zipCode=" + zipCode;
        String response = urlCall.callUrl(url);
        System.out.println(response);
    }

    public void findProductWithStoreNo(String storeNo, String productId) {
        URLCall urlCall = new URLCall();

        System.out.println("Finding product...");
        String url = "https://developer.api.walmart.com/api-proxy/service/affil/product/v2/items/" + productId + "?storeId=" + storeNo;
        String response = urlCall.callUrl(url);
        System.out.println(response);
    }
    
}