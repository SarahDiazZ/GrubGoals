package com.GrubGoals.dto;

import java.util.List;

public class StoreResponseDTO {
    private List<StoreDTO> stores;

    // Getters and Setters
    public List<StoreDTO> getStores() {
        return stores;
    }

    public void setStores(List<StoreDTO> stores) {
        this.stores = stores;
    }
}