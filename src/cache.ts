import {
  ShoppingItem,
  ShoppingItemCache,
  ShoppingList,
  ShoppingListCache,
} from "./redux/store";

interface ShoppingListMasterCache {
  [listId: string]: string[]; // list of item id
}

const shoppingMasterList: ShoppingListMasterCache = JSON.parse(
  localStorage.getItem("shopping-list-all") || "{}"
);

export function loadStateFromCache(): ShoppingList[] {
  return Object.keys(shoppingMasterList)
    .map((listId) => {
      const listCache = localStorage.getItem(`sl#${listId}`);
      if (listCache === null) return null;
      const listData = JSON.parse(listCache) as ShoppingListCache;
      return {
        id: listId,
        ...listData,
        items: shoppingMasterList[listId]
          .map((itemId) => {
            const itemCache = localStorage.getItem(`sl-item#${itemId}`);
            if (itemCache === null) return null;
            const itemData = JSON.parse(itemCache) as ShoppingItemCache;
            return {
              id: itemId,
              ...itemData,
            } as ShoppingItem;
          })
          .filter((o) => o !== null),
      } as ShoppingList;
    })
    .filter((o) => o !== null);
}

export function cacheList(listData: ShoppingList) {
  shoppingMasterList[listData.id] = [];

  setTimeout(() => {
    localStorage.setItem(
      "shopping-list-all",
      JSON.stringify(shoppingMasterList)
    );
    localStorage.setItem(
      `sl#${listData.id}`,
      JSON.stringify({
        name: listData.name,
        dateCreated: listData.dateCreated,
      } as ShoppingListCache)
    );
  }, 0);
}

export function decacheList(listId: string) {
  const items = [...shoppingMasterList[listId]];
  delete shoppingMasterList[listId];

  setTimeout(() => {
    localStorage.removeItem(`sl#${listId}`);
    items.forEach((itemId) => {
      localStorage.removeItem(`sl-item#${itemId}`);
    });
  }, 0);
}

export function cacheItem(listId: string, itemData: ShoppingItem) {
  shoppingMasterList[listId].push(itemData.id);

  setTimeout(() => {
    localStorage.setItem(
      "shopping-list-all",
      JSON.stringify(shoppingMasterList)
    );
    localStorage.setItem(
      `sl-item#${itemData.id}`,
      JSON.stringify({
        name: itemData.name,
        status: itemData.status,
      } as ShoppingItemCache)
    );
  }, 0);
}

export function updateItemCache(itemData: ShoppingItem) {
  setTimeout(() => {
    localStorage.removeItem(`sl-item#${itemData.id}`);
    localStorage.setItem(
      `sl-item#${itemData.id}`,
      JSON.stringify({
        name: itemData.name,
        status: itemData.status,
      } as ShoppingItemCache)
    );
  });
}

export function decacheItem(listId: string, itemId: string) {
  shoppingMasterList[listId] = shoppingMasterList[listId].filter(
    (i) => i !== itemId
  );

  setTimeout(() => {
    localStorage.removeItem(`sl-item#${itemId}`);
  }, 0);
}
