CREATE TABLE IF NOT EXISTS shopping_list_relationship (
    shopping_list_uuid UUID REFERENCES shopping_list(uuid),
    shopping_list_item_uuid UUID REFERENCES shopping_list_item(uuid),
    PRIMARY KEY (shopping_list_uuid, shopping_list_item_uuid)
);