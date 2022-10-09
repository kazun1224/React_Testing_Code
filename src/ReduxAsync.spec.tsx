import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import customCounterReducer from "./features/customCounter/customCounterSlice";
import ReduxAsync from "./ReduxAsync";
import userEvent from "@testing-library/user-event";

describe("ReduxAsync Integration Test", () => {
  // テスト用のStoreを作成
  let store: EnhancedStore;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        customCounter: customCounterReducer,
      },
    });
  });
  it("should display value with 100 + payload", async () => {
    // storeはrenderのたびに状態がリセットされる
    render(
      <Provider store={store}>
        <ReduxAsync />
      </Provider>
    );

    await userEvent.click(screen.getByText("FetchDummy"));
    //非同期の結果を待たせるためにはfindを使用する
    expect(await screen.findByTestId("count-value")).toHaveTextContent("105");
  });
});
