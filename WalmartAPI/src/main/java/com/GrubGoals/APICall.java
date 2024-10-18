package com.GrubGoals;

import java.io.InputStream;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class APICall {
    public static void main(String[] args) {
        // StoreLocatorController locator = new StoreLocatorController();
        ProductLookup lookup = new ProductLookup();
        ItemSearch itemSearch = new ItemSearch();

        Boolean running = true;
        int choice = 0;
        String item = "";

        while (running) {
            System.out.println("What would you like to do?");
            System.out.println("1. Find stores");
            System.out.println("2. Search for an item");
            System.out.println("3. Look up a product with a zip code");
            System.out.println("4. Exit");
    
            Scanner scanner = new Scanner(System.in);
            choice = scanner.nextInt();
            scanner.nextLine();

            switch (choice) {
                case 1:
                    // System.out.println("Enter a zip code:");
                    // String zip = scanner.next();
                    // locator.findStores(zip);

                    // System.out.println("Would you like to continue? (1 or 2)");
                    // System.out.println("1. Yes");
                    // System.out.println("2. No");

                    // choice = scanner.nextInt();
                    // scanner.nextLine();

                    // if (choice == 2) {
                    //     running = false;
                    // }
                    break;
                case 2:
                    System.out.println("Enter an item to search for:");
                    item = scanner.nextLine();
    
                    if (item.contains(" ")) {
                        item = item.replace(' ', '+');
                    }
                    itemSearch.searchItem(item);

                    System.out.println("Would you like to continue? (1 or 2)");
                    System.out.println("1. Yes");
                    System.out.println("2. No");

                    choice = scanner.nextInt();
                    scanner.nextLine();

                    if (choice == 2) {
                        running = false;
                    }
                    break;

                case 3:
                    System.out.println("Do you have an itemID? (1 or 2)");
                    System.out.println("1. Yes");
                    System.out.println("2. No");

                    int itemChoice = scanner.nextInt();
                    scanner.nextLine();

                    if (itemChoice == 1) {
                        System.out.println("Enter the item ID:");
                        String itemId = scanner.nextLine();
                        System.out.println("Enter the zip code:");
                        String zipCode = scanner.nextLine();
                        lookup.findProductWithZip(zipCode, itemId);
                    } else {
                        System.out.println("Enter an item to search for:");
                        item = scanner.nextLine();
        
                        if (item.contains(" ")) {
                            item = item.replace(' ', '+');
                        }
                        itemSearch.searchItem(item);

                        System.out.println("Remember the itemID to look up:");
                        System.out.println("Enter the item ID:");
                        String itemId = scanner.nextLine();
                        System.out.println("Enter the zip code:");
                        String zipCode = scanner.nextLine();
                        lookup.findProductWithZip(zipCode, itemId);

                        System.out.println("Would you like to continue? (1 or 2)");
                        System.out.println("1. Yes");
                        System.out.println("2. No");

                        choice = scanner.nextInt();
                        scanner.nextLine();

                        if (choice == 2) {
                            running = false;
                        }
                        break;
                    }

                case 4:
                    System.out.println("Goodbye!");
                    running = false;
                    break;
                default:
                    System.out.println("Invalid choice");
                    break;
            }

        }
    }
}
