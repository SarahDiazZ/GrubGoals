package com.GrubGoals.dto;

import java.util.List;


/**
 * The response data that we get from StoreDTO
 */
public class StoreResponseDTO {
    private List<StoreDTO> stores;

    public List<StoreDTO> getStores() {
        return stores;
    }

    public void setStores(List<StoreDTO> stores) {
        this.stores = stores;
    }
}