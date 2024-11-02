import { useDispatch } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { createList } from "../../../redux/store";

type ShoppingListCreateInput = {
  name: string;
};

export default function ShoppingListCreateForm() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShoppingListCreateInput>();

  const onSubmit: SubmitHandler<ShoppingListCreateInput> = (data) => {
    dispatch(createList({ name: data.name }));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="py-2  grid grid-cols-12 grid-rows-2 sm:grid-rows-1 items-center gap-2 w-full max-w-[1000px] sm:mx-auto"
    >
      <label
        htmlFor="name"
        className="col-span-2 sm:col-span-1 text-left font-semibold"
      >
        Name
      </label>
      <input
        className=" py-2 sm:col-span-9 col-span-10 relative w-full border border-gray-200 px-4 bg-gray-100"
        placeholder="Shopping List Name"
        {...register("name", { required: true })}
      />
      {errors.name && (
        <small className="bottom-0 absolute">{errors.name.message}</small>
      )}

      <button
        type="submit"
        className="hover:bg-orange-400 bg-orange-400 text-white font-bold text-sm tracking-[4px] sm:w-full h-full sm:col-span-2 col-span-12 rounded-md"
      >
        CREATE
      </button>
    </form>
  );
}
