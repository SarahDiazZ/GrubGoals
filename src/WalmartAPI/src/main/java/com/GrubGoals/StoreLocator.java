package com.GrubGoals;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

import org.json.JSONArray;
import org.json.JSONObject;

public class StoreLocator {
    public void findStores(String zipCode) {
        URLCall urlCall = new URLCall();
        String url = "https://developer.api.walmart.com/api-proxy/service/affil/product/v2/stores?zip=" + zipCode;
        String response = urlCall.callUrl(url);
        System.out.println(response);
    }
}