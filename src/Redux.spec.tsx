import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import customCounterReducer from "./features/customCounter/customCounterSlice";
import Redux from "./Redux";
import userEvent from "@testing-library/user-event";

describe("Redux Integration Test", () => {
  // テスト用のStoreを作成
  let store: EnhancedStore;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        customCounter: customCounterReducer,
      },
    });
  });
  it("should display value with increment by 1 per click",async () => {
    // storeはrenderのたびに状態がリセットされる
    render(
      <Provider store={store}>
        <Redux />
      </Provider>
    );
    await userEvent.click(screen.getByText("+"));
    await userEvent.click(screen.getByText("+"));
    await userEvent.click(screen.getByText("+"));
    expect(screen.getByTestId("count-value")).toHaveTextContent("3");
  });
  it("should display value with decrement by 1 per click",async () => {
    render(
      <Provider store={store}>
        <Redux />
      </Provider>
    );
    await userEvent.click(screen.getByText("-"));
    await userEvent.click(screen.getByText("-"));
    expect(screen.getByTestId("count-value")).toHaveTextContent("-2");
  });
  it("should display value with incrementByAmount",async () => {
    render(
      <Provider store={store}>
        <Redux />
      </Provider>
    );
    // typeは第一引数にinput　第二引数に入力する値を入れるEvent
    await userEvent.type(screen.getByPlaceholderText("Enter"),"30");
    await userEvent.click(screen.getByText("incrementByAmount"));
    expect(screen.getByTestId("count-value")).toHaveTextContent("30");
  });
});
