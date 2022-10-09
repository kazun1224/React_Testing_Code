import { act, renderHook } from "@testing-library/react";

import { useCounter } from "./useCounter";

describe("useCounter custom hook", () => {
  it("should increment by 1", () => {
    const { result } = renderHook(() => useCounter(3));

    // result.currentでCustom Hookで定義したものにアクセスできる。
    expect(result.current.count).toBe(3);
    // react hooksを使った場合actで囲む必要がある
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(4);
  });
  it("should decrement by -1", () => {
    const { result } = renderHook(() => useCounter(3));

    expect(result.current.count).toBe(3);
    act(() => {
      result.current.decrement();
    });
    expect(result.current.count).toBe(2);
  });
  it("should double the counter value", () => {
    const { result } = renderHook(() => useCounter(3));

    expect(result.current.count).toBe(3);
    act(() => {
      result.current.double();
    });
    expect(result.current.count).toBe(6);
  });
  it("should triple the counter value", () => {
    const { result } = renderHook(() => useCounter(3));

    expect(result.current.count).toBe(3);
    act(() => {
      result.current.triple();
    });
    expect(result.current.count).toBe(9);
  });
  it("should reset the zero", () => {
    const { result } = renderHook(() => useCounter(3));

    expect(result.current.count).toBe(3);
    act(() => {
      result.current.reset();
    });
    expect(result.current.count).toBe(0);
  });
});
