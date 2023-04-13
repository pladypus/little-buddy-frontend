import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useQuestionSelect } from "./useQuestionSelect";

describe("Question Select", () => {
  test("returns without error", () => {
    render(<MockComp />);
    const qElement = screen.getByTestId(/alg-q-test/i);
    expect(qElement).toBeInTheDocument;
  });

  test("gets new question", async () => {
    render(<MockComp />);

    const qElement = screen.getByTestId(/alg-q-test/i);
    expect(qElement).toBeInTheDocument;
    const qType = qElement.getAttribute("data-categ");
    await waitFor(() => {
      expect(qType).not.toEqual(null);
    });

    const mockComp = screen.getByTestId(/mock-comp/i);
    fireEvent.click(mockComp);

    const qElement2 = screen.getByTestId(/alg-q-test/i);
    expect(qElement2).toBeInTheDocument;
    const qType2 = qElement2.getAttribute("data-categ");

    await waitFor(() => {
      expect(qType2).not.toEqual(null);
      expect(qType2).not.toEqual(qType);
    });
  });

  test("skips fetch if finished", async () => {
    render(<MockComp finishedTest />);
    const qElement = screen.getByTestId(/alg-q-test/i);
    expect(qElement).toBeInTheDocument;

    const qType = qElement.getAttribute("data-categ");
    await waitFor(() => {
      expect(qType).not.toEqual(null);
    });

    const mockComp = screen.getByTestId(/mock-comp/i);
    fireEvent.click(mockComp);

    const qElement2 = screen.getByTestId(/alg-q-test/i);
    expect(qElement2).toBeInTheDocument;
    const qType2 = qElement2.getAttribute("data-categ");
    await waitFor(() => {
      expect(qType2).not.toEqual(null);
      expect(qType2).toEqual(qType);
    });
  });
});

const MockComp: React.FC<{
  finishedTest?: boolean;
}> = ({ finishedTest }) => {
  const register = jest.fn();
  const getValues = jest.fn(() => [] as any);

  const {
    isFinished,
    question,
    setGetNewQuestion,
    setIsFinished,
    setQuestion,
  } = useQuestionSelect({ getValues, register });

  const callFunction = () => {
    if (finishedTest) {
      setIsFinished((prev) => !prev);
      return;
    }

    setGetNewQuestion((prev) => !prev);
  };

  return (
    <div onClick={callFunction} data-testid="mock-comp">
      {question}
    </div>
  );
};
