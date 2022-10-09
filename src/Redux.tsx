import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCount,
  increment,
  decrement,
  incrementByAmount,
} from "./features/customCounter/customCounterSlice";

const Redux = () => {
  const [number, setNumber] = useState<number>(0);
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <div>
      <h3>Redux Integration Test</h3>
      <div>
        <button onClick={() => dispatch(increment())}>+</button>
        <span data-testid="count-value">{count}</span>
        <button onClick={() => dispatch(decrement())}>-</button>
        <button onClick={() => dispatch(incrementByAmount(number|0))}>incrementByAmount</button>
        <input type="number" placeholder="Enter" value={number} onChange={(e)=>setNumber(Number(e.currentTarget.value) ) }/>
      </div>
    </div>
  );
};

export default Redux;
