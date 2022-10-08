import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import MockServer from "./MockServer";
import  UserEvent  from "@testing-library/user-event";
import {rest} from"msw"
import {setupServer} from"msw/node"

// mswでテスト用の擬似的なサーバーを作成
const server =setupServer(
  rest.get("https://jsonplaceholder.typicode.com/users/1",(req,res,ctx)=>{
    return res(ctx.status(200), ctx.json({username: "Brad dummy"}))
  })
)

// このファイルで最初の一回だけ実行される処理(サーバーを起動)
beforeAll(()=> server.listen())
// 最後の一回だけ実行される処理
afterEach(()=>{
  // 決まりごと
  server.resetHandlers();
  cleanup();
})
// 終わりの処理
afterAll(()=>server.close());

describe("Mocking API",()=>{
  it("[Fetch success]Should display fetched data correctly and button disable",async()=>{

    render(<MockServer/>)
    UserEvent.click(screen.getByRole("button"))
    expect(await screen.findByRole("heading")).toHaveTextContent("Brad dummy")
    expect(screen.getByRole("button")).toHaveAttribute("disabled")
  })
  it("[Fetch failure]Should display error message , no render heading and button abled", async()=>{
    server.use(rest.get("https://jsonplaceholder.typicode.com/users/1",(req,res,ctx)=>{
      return res(ctx.status(404))
    }))

    render(<MockServer/>)
    UserEvent.click(screen.getByRole("button"));
    expect(await screen.findByTestId("error")).toHaveTextContent("Fetching failed !")
    expect(screen.queryByRole("heading")).toBeNull()
    expect(screen.getByRole("button")).not.toHaveAttribute("disabled")

  })
})
