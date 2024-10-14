export const validateInventoryForm = (values) => {
    const errors = {};

    if (!values.inventoryId) {
        errors.inventoryId = "Inventory ID is required.";
    }
    if (!values.name || values.name.length < 3) {
        errors.name = "Name must be at least 3 characters long.";
    }
    if (!values.quantity || values.quantity <= 0) {
        errors.quantity = "Quantity must be a positive number.";
    }
    if (!values.minLevel || values.minLevel <= 0) {
        errors.minLevel = "Minimum Level must be a positive number.";
    }
    if (!values.purchaseDate) {
        errors.purchaseDate = "Purchase Date is required.";
    } else {
        const purchaseYear = new Date(values.purchaseDate).getFullYear();
        if (purchaseYear < 2000 || purchaseYear > 2050) {
            errors.purchaseDate = "Purchase Date must be between 2000 and 2050.";
        }
    }

    return errors;
};
