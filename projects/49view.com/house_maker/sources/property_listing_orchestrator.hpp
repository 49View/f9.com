//
// Created by dado on 18/06/2020.
//

#pragma once

#include <eh_arch/models/property_list.hpp>

class PropertyListingOrchestrator {
public:
    std::vector<PropertyListing>& PropertyList() {
        return propertyList;
    }
    PropertyListing& ActiveProperty() {
        return activeProperty;
    }
private:
    std::vector<PropertyListing> propertyList;
    PropertyListing activeProperty{};
};