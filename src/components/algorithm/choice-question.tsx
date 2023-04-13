import { UseFormRegister } from "react-hook-form";
import { apiData } from "~/pages/find-breed";

const ChoiceQuestion: React.FC<{
  category:
    | "barking"
    | "energy"
    | "protectiveness"
    | "shedding"
    | "trainability";
  register: UseFormRegister<apiData>;
}> = ({ category, register }) => {
  return (
    <label className="capitalize font-bold">
      {category}:
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        {...register(category)}
      >
        <option className="hidden" />
        <option value={0}>{0}</option>
        <option value={1}>{1}</option>
        <option value={2}>{2}</option>
        <option value={3}>{3}</option>
        <option value={4}>{4}</option>
        <option value={5}>{5}</option>
      </select>
    </label>
  );
};

export default ChoiceQuestion;
