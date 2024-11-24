package com.GrubGoals;


import java.util.List;

import com.GrubGoals.dto.ItemSearchDTO;
import com.GrubGoals.dto.StoreDTO;
import com.GrubGoals.service.ItemSearchService;
import com.GrubGoals.service.StoreLocatorService;

public class Main {
    public static void main(String[] args) {
        URLCall urlCall = new URLCall();
        ItemSearchService service = new ItemSearchService(urlCall);
        List<ItemSearchDTO> items = service.searchItems("bluey");
        // Print the items or perform further operations
        System.out.println(items);

        // Test StoreLocatorService
        StoreLocatorService storeLocatorService = new StoreLocatorService(urlCall);
        List<StoreDTO> stores = storeLocatorService.findStores("90210");
        System.out.println("Store Locator Results:");
        System.out.println(stores);
    }
}