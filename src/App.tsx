import { useDispatch, useSelector } from "react-redux";
import {
  deleteItem,
  deleteList,
  editItem,
  RootState,
  ShoppingList,
} from "./redux/store";
import ShoppingListCreateForm from "./components/forms/shopping-list/create";
import ListItemCreateForm from "./components/forms/list-item/create";
import autoAnimate from "@formkit/auto-animate";
import { useEffect, useRef } from "react";

function App() {
  const dispatch = useDispatch();
  const shoppingList = useSelector<RootState, ShoppingList[]>(
    (state) => state.data
  );

  const parent = useRef<HTMLDivElement>(null);
  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <div className="pb-8 w-full flex justify-center">
      <div className="w-full flex flex-col">
        <h1 className="text-lg font-bold text-center text-white bg-orange-500 uppercase tracking-[6px] py-4">
          Shopping List Maker
        </h1>
        <div className="w-full  sm:w-auto px-2 flex">
          <div className=" py-4 flex flex-col w-full">
            <ShoppingListCreateForm />

            <div
              className="grid grid-cols-1 w-full md:grid-cols-2 lg:grid-cols-3  gap-2 lg:container mx-auto py-4"
              ref={parent}
            >
              {shoppingList.map((shoppingList) => (
                <div
                  key={shoppingList.id}
                  className="w-full max-w-[600px] mx-auto py-2"
                >
                  <div className="flex flex-row bg-orange-500 py-2 text-white font-bold">
                    <h3 className="text-center w-full">{shoppingList.name}</h3>
                    <button
                      className="px-2"
                      onClick={() => {
                        dispatch(
                          deleteList({
                            listId: shoppingList.id,
                          })
                        );
                      }}
                    >
                      X
                    </button>
                  </div>

                  <div className="flex flex-col">
                    {shoppingList.items.map((item, index) => (
                      <div
                        key={item.id}
                        className="text-center grid grid-cols-12 w-full justify-center border-b border-l border-r border-solid border-orange-300"
                      >
                        <span className="p-2 bg-orange-200">{index + 1}</span>
                        <span className="w-full py-2 relative col-span-9">
                          {item.name}
                        </span>
                        <div className="flex items-center justify-center bg-orange-200">
                          <input
                            type="checkbox"
                            onChange={() => {
                              dispatch(
                                editItem({
                                  itemId: item.id,
                                  listId: shoppingList.id,
                                  data: {
                                    status: !item.status,
                                  },
                                })
                              );
                            }}
                            checked={item.status}
                          />
                        </div>
                        <button
                          className="bg-orange-200 text-orange-500"
                          onClick={() => {
                            dispatch(
                              deleteItem({
                                itemId: item.id,
                                listId: shoppingList.id,
                              })
                            );
                          }}
                        >
                          X
                        </button>
                      </div>
                    ))}
                    <ListItemCreateForm listId={shoppingList.id} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
