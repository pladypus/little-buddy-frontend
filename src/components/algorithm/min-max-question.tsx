import { UseFormRegister } from "react-hook-form";
import { apiData } from "~/pages/find-breed";
import Input from "../UI/Input";

export function isMinMax(
  val: string
): val is "height" | "life_expectancy" | "weight" {
  return val === "height" || val === "weight" || val === "life_expectancy";
}

const MinMaxQuestion: React.FC<{
  category: "height" | "life_expectancy" | "weight";
  register: UseFormRegister<apiData>;
}> = ({ category, register }) => {
  const labelText = category.replace(/_/, " ");

  return (
    <div
      className="grid grid-row-2 gap-4"
      data-testid="alg-q-test"
      data-categ={category}
    >
      <label className="capitalize font-bold">
        Min {labelText}
        <Input
          className="font-normal text-black"
          type="number"
          {...register(`${category}Min`)}
        />
      </label>
      <label className="capitalize font-bold">
        Max {labelText}
        <Input
          className="font-normal text-black"
          type="number"
          {...register(`${category}Max`)}
        />
      </label>
    </div>
  );
};

export default MinMaxQuestion;
