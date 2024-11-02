import { ShoppingItem, ShoppingList } from "./store";

export const getStateCopy = {
  createList(
    currentState: ShoppingList[],
    listData: ShoppingList
  ): ShoppingList[] {
    return [...currentState, listData];
  },

  deleteList(currentState: ShoppingList[], listId: string): ShoppingList[] {
    return [...currentState.filter((l) => l.id !== listId)];
  },

  addItem(
    currentState: ShoppingList[],
    listId: string,
    itemData: ShoppingItem
  ): ShoppingList[] {
    const listIdx = currentState.findIndex((l) => l.id === listId);
    if (listIdx === undefined) return currentState;

    return [
      ...currentState.slice(0, listIdx),
      {
        ...currentState[listIdx],
        items: [...currentState[listIdx].items, itemData],
      },
      ...currentState.slice(listIdx + 1, currentState.length),
    ];
  },

  editItem(
    currentState: ShoppingList[],
    listId: string,
    itemData: ShoppingItem
  ): ShoppingList[] {
    const listIdx = currentState.findIndex((l) => l.id === listId);
    if (listIdx === undefined) return currentState;
    const itemIdx = currentState[listIdx].items.findIndex(
      (i) => i.id === itemData.id
    );
    if (itemIdx === undefined) return currentState;

    return [
      ...currentState.slice(0, listIdx),
      {
        ...currentState[listIdx],
        items: [
          ...currentState[listIdx].items.slice(0, itemIdx),
          itemData,
          ...currentState[listIdx].items.slice(
            itemIdx + 1,
            currentState[listIdx].items.length
          ),
        ],
      },
      ...currentState.slice(listIdx + 1, currentState.length),
    ];
  },

  deleteItem(
    currentState: ShoppingList[],
    listId: string,
    itemId: string
  ): ShoppingList[] {
    const listIdx = currentState.findIndex((l) => l.id === listId);
    if (listIdx === undefined) return currentState;

    return [
      ...currentState.slice(0, listIdx),
      {
        ...currentState[listIdx],
        items: [...currentState[listIdx].items.filter((i) => i.id !== itemId)],
      },
      ...currentState.slice(listIdx + 1, currentState.length),
    ];
  },
};
