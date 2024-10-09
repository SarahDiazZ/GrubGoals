package com.GrubGoals;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Map;
import org.json.JSONArray;
import org.json.JSONObject;

public class URLCall {
    public String callUrl(String url) {
        SignatureGenerator generator = new SignatureGenerator();
        Map<String, String> headers = generator.apiHeaders();
        String apiResponse = "";
         try {
            HttpURLConnection connection = (HttpURLConnection) new URL(url).openConnection();
            headers.forEach(connection::setRequestProperty);
            connection.setRequestMethod("GET");

            int responseCode = connection.getResponseCode();
            System.out.println("Response Code: " + responseCode);

            if (responseCode == 200) {
                BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                String inputLine;
                StringBuilder response = new StringBuilder();

                while ((inputLine = in.readLine()) != null) {
                    response.append(inputLine);
                }
                in.close();

                String responseString = response.toString().trim();

                if (responseString.startsWith("[")) {
                    JSONArray jsonArray = new JSONArray(responseString);
                    JSONArray limitedArray = new JSONArray();
                    for (int i = 0; i < Math.min(3, jsonArray.length()); i++) {
                        limitedArray.put(jsonArray.getJSONObject(i));
                    }
                    apiResponse = limitedArray.toString(4);

                } else if (responseString.startsWith("{")) {

                    JSONObject jsonObject = new JSONObject(responseString);

                    if (jsonObject.has("items")) { 
                        //offerType - ONLINE_ONLY??
                        //stock is only stock online??
                        JSONArray itemsArray = jsonObject.getJSONArray("items");
                        JSONArray limitedItemsArray = new JSONArray();

                        for (int i = 0; i < Math.min(3, itemsArray.length()); i++) {
                            JSONObject originalItem = itemsArray.getJSONObject(i);
                            JSONObject limitedItem = new JSONObject();
                            limitedItem.put("itemId", originalItem.get("itemId"));
                            limitedItem.put("name", originalItem.get("name"));
                            limitedItem.put("stock", originalItem.get("stock"));    
                            limitedItem.put("salePrice", originalItem.get("salePrice"));
                            limitedItem.put("offerType", originalItem.get("offerType"));
                            limitedItemsArray.put(limitedItem);

                            //Full Description
                            // limitedItemsArray.put(itemsArray.getJSONObject(i));
                        }

                        jsonObject.put("items", limitedItemsArray);
                    }

                    apiResponse = jsonObject.toString(4);
                } else {
                    apiResponse = "Unexpected response format";
                }
            } else {
                System.out.println("Error: " + responseCode);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return apiResponse;
    }
    
}
