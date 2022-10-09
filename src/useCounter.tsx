import { useState } from "react";

export const useCounter = (initialCount: number) => {
  const [count, setCount] = useState<number>(initialCount);

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decrement = () => {
    setCount((prevCount) => prevCount - 1);
  };
  const double = () => {
    setCount((prevCount) => prevCount * 2);
  };
  const triple = () => {
    setCount((prevCount) => prevCount * 3);
  };
  const reset = () => {
    setCount(0);
  };

  return { count, increment, decrement, double, triple, reset };
};
