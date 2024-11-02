import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addItem } from "../../../redux/store";

type ListItemCreateInput = {
  name: string;
};

interface Props {
  listId: string;
}

export default function ListItemCreateForm({ listId }: Props) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ListItemCreateInput>();

  const onSubmit: SubmitHandler<ListItemCreateInput> = (data) => {
    dispatch(
      addItem({
        item: {
          name: data.name,
          status: false,
        },
        listId,
      })
    );
    reset({
      name: "",
    });
  };
  return (
    <form
      className="grid text-center grid-cols-12 w-full justify-center border-b border-l border-r border-solid border-orange-300"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="p-2 bg-orange-200">+</div>

      <input
        className="w-full h-full py-2 text-center  relative col-span-9"
        placeholder="Item Name"
        {...register("name", { required: true })}
      />
      {errors.name && (
        <small className="absolute bottom-0">{errors.name.message}</small>
      )}
      <button
        type="submit"
        className="text-orange-500 px-4 col-span-2 bg-orange-200"
      >
        ADD
      </button>
    </form>
  );
}
