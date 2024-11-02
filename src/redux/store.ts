import { createSlice, configureStore, current } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import {
  cacheItem,
  cacheList,
  decacheItem,
  decacheList,
  loadStateFromCache,
  updateItemCache,
} from "../cache";
import { getStateCopy } from "./helper";

export interface ShoppingItemCache {
  name: string;
  status: boolean;
}

export interface ShoppingItem extends ShoppingItemCache {
  id: string;
}

export interface ShoppingListCache {
  name: string;
  dateCreated: number;
}

export interface ShoppingList extends ShoppingListCache {
  id: string;
  items: ShoppingItem[];
}

interface PayloadParam<T> {
  payload: T;
  type: string;
}

type CreateParams = PayloadParam<{
  name: string;
}>;
type DeleteParams = PayloadParam<{ listId: string }>;
type AddItemParams = PayloadParam<{
  item: ShoppingItemCache;
  listId: string;
}>;
type DeleteItemParams = PayloadParam<{
  itemId: string;
  listId: string;
}>;
type EditItemParams = PayloadParam<{
  itemId: string;
  listId: string;
  data: Partial<ShoppingItemCache>;
}>;

const shoppingListSlice = createSlice({
  name: "shopping-list",
  initialState: {
    data: loadStateFromCache(),
  },
  reducers: {
    createList: (state, { payload }: CreateParams) => {
      const listData: ShoppingList = {
        id: uuid(),
        dateCreated: new Date().getTime(),
        items: [],
        name: payload.name,
      };

      state.data.push(listData);
      //  = getStateCopy.createList(current(state), listData)
      cacheList(listData);
    },
    deleteList: (state, { payload }: DeleteParams) => {
      state.data = getStateCopy.deleteList(current(state.data), payload.listId);
      decacheList(payload.listId);
    },
    addItem: (state, { payload }: AddItemParams) => {
      const itemData: ShoppingItem = {
        id: uuid(),
        ...payload.item,
      };

      state.data = getStateCopy.addItem(
        current(state.data),
        payload.listId,
        itemData
      );
      cacheItem(payload.listId, itemData);
    },
    editItem: (state, { payload }: EditItemParams) => {
      const currentState = current(state.data);
      const listIdx = currentState.findIndex((l) => l.id === payload.listId);
      const itemIdx = currentState[listIdx].items.findIndex(
        (i) => i.id === payload.itemId
      );
      const itemData: ShoppingItem = {
        ...currentState[listIdx].items[itemIdx],
        ...payload.data,
      };
      state.data = getStateCopy.editItem(
        currentState,
        payload.listId,
        itemData
      );
      updateItemCache(itemData);
    },
    deleteItem: (state, { payload }: DeleteItemParams) => {
      state.data = getStateCopy.deleteItem(
        current(state.data),
        payload.listId,
        payload.itemId
      );
      decacheItem(payload.listId, payload.itemId);
    },
  },
});
export type RootState = ReturnType<typeof store.getState>;

export const { addItem, createList, deleteList, deleteItem, editItem } =
  shoppingListSlice.actions;

export const store = configureStore({
  reducer: shoppingListSlice.reducer,
});
