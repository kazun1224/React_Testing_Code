import reducer, {
  increment,
  incrementByAmount,
} from "./features/customCounter/customCounterSlice";

describe("Reducer of ReduxToolkit", () => {
  describe("increment action", () => {
    let initialState = {
      mode: 0,
      value: 1,
      username: "",
    };
    it("Should increment by 1 with mode 0", () => {
      const action = { type: increment.type };
      const state = reducer(initialState, action);
      expect(state.value).toEqual(2);
    });
    it("Should increment by 100 with mode 1", () => {
      initialState = {
        mode: 1,
        value: 1,
        username: "",
      };
      const action = { type: increment.type };
      const state = reducer(initialState, action);
      expect(state.value).toEqual(101);
    });
    it("Should increment by 10000 with mode 2", () => {
      initialState = {
        mode: 2,
        value: 1,
        username: "",
      };
      const action = { type: increment.type };
      const state = reducer(initialState, action);
      expect(state.value).toEqual(10001);
    });
  });
  describe("incrementByAmount action", () => {
    let initialState = {
      mode: 0,
      value: 1,
      username: "",
    };
    it("should increment by payload value with mode 0", () => {
      const action = {type: incrementByAmount.type,payload: 3};
      const state = reducer(initialState,action);
      expect(state.value).toEqual(4)
    });
    it("should increment by payload value with mode 1", () => {
      let initialState = {
        mode: 1,
        value: 1,
        username: "",
      };
      const action = {type: incrementByAmount.type,payload: 3};
      const state = reducer(initialState,action);
      expect(state.value).toEqual(301)
    });
    it("should increment by payload value with mode 2", () => {
      let initialState = {
        mode: 2,
        value: 1,
        username: "",
      };
      const action = {type: incrementByAmount.type,payload: 3};
      const state = reducer(initialState,action);
      expect(state.value).toEqual(30001)
    });
  });
});
