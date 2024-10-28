package com.GrubGoals;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.GrubGoals.StoreLocatorController;
import com.GrubGoals.dto.ItemSearchResponseDTO;
import com.GrubGoals.exception.ResourceNotFoundException;
import com.GrubGoals.service.ItemSearchService;

@RestController
public class ItemSearchController {
    private final ItemSearchService itemSearchService;

    public ItemSearchController(ItemSearchService itemSearchService) {
        this.itemSearchService = itemSearchService;
    }

    @GetMapping("/items/{query}")
    public ItemSearchResponseDTO searchItems(@PathVariable String query) {
        List<com.GrubGoals.dto.ItemSearchDTO> items = itemSearchService.searchItems(query);
        if (items.isEmpty()) {
            throw new ResourceNotFoundException("No items found for query: " + query);
        }
        
        ItemSearchResponseDTO response = new ItemSearchResponseDTO();
        response.setItems(items);
        return response;
    }
    
}
