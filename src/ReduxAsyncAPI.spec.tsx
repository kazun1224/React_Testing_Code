import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { cleanup, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import customCounterReducer from "./features/customCounter/customCounterSlice";
import ReduxAsync from "./ReduxAsync";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/lib/node";
import { rest } from "msw";

// MockServerWorkerで外部の擬似的なサーバーを作成
const server = setupServer(
  rest.get("https://jsonplaceholder.typicode.com/users/1", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ username: "Bred dummy" }));
  })
);
beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

describe("Redux Async API Mocking", () => {
  // テスト用のStoreを作成
  let store: EnhancedStore;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        customCounter: customCounterReducer,
      },
    });
  });
  it("[Fetch success]should display username in h3 tag", async () => {
    // storeはrenderのたびに状態がリセットされる
    render(
      <Provider store={store}>
        <ReduxAsync />
      </Provider>
    );

    // 存在しないことをテストする場合,queryByRoleを使用する
    expect(screen.queryByRole("heading")).toBeNull();

    await userEvent.click(screen.getByText("FetchJson"));
    //非同期の結果を待たせるためにはfindを使用する
    // toBeInTheDocumentは存在するということをテストする
    expect(await screen.findByText("Bred dummy")).toBeInTheDocument();
  });
  it("[Fetch failed]should display anonymous in h3 tag", async () => {
    server.use(
      rest.get(
        "https://jsonplaceholder.typicode.com/users/1",
        (req, res, ctx) => {
          return res(ctx.status(404));
        }
      )
    );
    // storeはrenderのたびに状態がリセットされる
    render(
      <Provider store={store}>
        <ReduxAsync />
      </Provider>
    );

    // 存在しないことをテストする場合,queryByRoleを使用する
    expect(screen.queryByRole("heading")).toBeNull();

    await userEvent.click(screen.getByText("FetchJson"));
    expect(await screen.findByText("anonymous")).toBeInTheDocument();
  });
});
