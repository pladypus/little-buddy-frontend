import log from "loglevel";
import { ReactNode, useEffect, useState } from "react";
import { UseFormGetValues, UseFormRegister } from "react-hook-form";
import ChoiceQuestion from "~/components/algorithm/choice-question";
import MinMaxQuestion, {
  isMinMax,
} from "~/components/algorithm/min-max-question";
import { apiData } from "~/pages/find-breed";
import { randomProperty } from "~/utils/property-select";

export type qType =
  | "barking"
  | "energy"
  | "protectiveness"
  | "shedding"
  | "trainability"
  | "height"
  | "life_expectancy"
  | "weight";

const qTypeOptions: qType[] = [
  "barking",
  "energy",
  "protectiveness",
  "shedding",
  "trainability",
  "height",
  "life_expectancy",
  "weight",
];

export const useQuestionSelect = (params: {
  getValues: UseFormGetValues<apiData>;
  register: UseFormRegister<apiData>;
}) => {
  const [question, setQuestion] = useState<ReactNode>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [getNewQuestion, setGetNewQuestion] = useState(true);

  useEffect(() => {
    if (!getNewQuestion || isFinished) return;

    log.debug("FETCHING NEW QUESTION");

    const existingKeys = Object.keys(params.getValues()).map((key) => {
      const keyGroup = key.match(/^(\w*)(Min|Max)$/);
      return keyGroup == null ? key : keyGroup[1];
    });
    log.debug("🚀 ~ file: find-breed.tsx:108 ~ existingKeys ~ existingKeys:", {
      existingKeys,
      values: params.getValues(),
    });

    // pick random new question
    const newQuestionCateg = randomProperty(
      qTypeOptions,
      existingKeys as qType[]
    );
    log.debug(
      "🚀 ~ file: useQuestionSelect.tsx:59 ~ useEffect ~ newQuestionCateg:",
      newQuestionCateg
    );

    const newQuestionJsx = isMinMax(newQuestionCateg) ? (
      <MinMaxQuestion category={newQuestionCateg} register={params.register} />
    ) : (
      <ChoiceQuestion category={newQuestionCateg} register={params.register} />
    );

    setQuestion(newQuestionJsx);
    setGetNewQuestion(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getNewQuestion]);

  return {
    question,
    setIsFinished,
    setGetNewQuestion,
    setQuestion,
    isFinished,
  };
};
