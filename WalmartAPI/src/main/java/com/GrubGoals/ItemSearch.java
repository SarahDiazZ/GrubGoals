// package com.GrubGoals;

// import java.io.BufferedReader;
// import java.io.InputStreamReader;
// import java.net.HttpURLConnection;
// import java.net.URL;
// import java.util.Scanner;
// import java.util.concurrent.Flow.Publisher;
// import org.json.JSONArray;
// import org.json.JSONObject;

// public class ItemSearch {
//     public void searchItem(String item) {
//         URLCall urlCall = new URLCall();
//         Scanner scanner = new Scanner(System.in);

//         System.out.println("Searching for item...");
//         String url = "https://developer.api.walmart.com/api-proxy/service/affil/product/v2/search?query=" + item;
//         String response = urlCall.callUrl(url);
//         System.out.println(response);

//         System.out.println("Would you like to find a product with a zip code?");
//         System.out.println("1. Yes");
//         System.out.println("2. No");

//         int choice = scanner.nextInt();
//         scanner.nextLine();

//         if (choice == 1) {
//             System.out.println("Enter the item ID:");
//             String itemId = scanner.nextLine();
//             System.out.println("Enter the zip code:");
//             String zipCode = scanner.nextLine();
//             ProductLookup lookup = new ProductLookup();
//             lookup.findProductWithZip(zipCode, itemId);
//         } else {
//             System.out.println("Goodbye!");
//         }
//     }
// }