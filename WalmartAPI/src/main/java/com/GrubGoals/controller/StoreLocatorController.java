package com.GrubGoals;

import com.GrubGoals.dto.StoreDTO;
import com.GrubGoals.dto.StoreResponseDTO;
import com.GrubGoals.exception.ResourceNotFoundException;
import com.GrubGoals.service.StoreLocatorService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StoreLocatorController {
    private final StoreLocatorService storeLocatorService;

    public StoreLocatorController(StoreLocatorService storeLocatorService) {
        this.storeLocatorService = storeLocatorService;
        
    }

    @GetMapping("/stores/{zipCode}")
    public StoreResponseDTO findStores(@PathVariable String zipCode) {
        List<StoreDTO> stores = storeLocatorService.findStores(zipCode);
        if (stores.isEmpty()) {
            throw new ResourceNotFoundException("No stores found for zip code: " + zipCode);
        }
        StoreResponseDTO response = new StoreResponseDTO();
        response.setStores(stores);
        return response;
    }
}