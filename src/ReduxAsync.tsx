import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "./app/store";
import {
  fetchDummy,
  fetchJson,
  selectCount,
  selectUsername,
} from "./features/customCounter/customCounterSlice";

const ReduxAsync = () => {
  const count = useSelector(selectCount);
  const username = useSelector(selectUsername);
  // AppDispatchを入れないとcreateAsyncThunkを引数に入れたらerrorになる
  const dispatch: AppDispatch = useDispatch();
  return (
    <div>
      <span data-testid="count-value">{count}</span>
      <button onClick={() => dispatch(fetchDummy(5))}>FetchDummy</button>
      {username && <h1>{username}</h1>}
      <button onClick={() => dispatch(fetchJson())}>FetchJson</button>
    </div>
  );
};

export default ReduxAsync;
