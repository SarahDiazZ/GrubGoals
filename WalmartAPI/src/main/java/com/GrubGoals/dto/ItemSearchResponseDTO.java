package com.GrubGoals.dto;

import java.util.List;

/**
 * Setters and Getters for assigning the data in a return 
 */
public class ItemSearchResponseDTO {
    private List<ItemSearchDTO> items;

    public List<ItemSearchDTO> getItems() {
        return items;
    }

    public void setItems(List<ItemSearchDTO> items) {
        this.items = items;
    }
}
