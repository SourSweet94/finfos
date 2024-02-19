import { useReducer } from "react";

const counterReducer = (state: any, action: any) => {
  switch (action.type) {
    case "INCREASE":
      return { ...state, counter: state.counter + 1 };
    case "DECREASE":
      return { ...state, counter: state.counter - 1 };
    case "CUSTOM":
      return { ...state, counter: state.counter + action.payload };
    default:
      return state;
  }
};

const Counter = () => {
  const [state, dispatch] = useReducer(counterReducer, { counter: 0 });

  return (
    <>
      <label>Number: </label>
      <div>{state.counter}</div>

      <button onClick={() => dispatch({type: "INCREASE"})}>Increase</button>
      <button onClick={() => dispatch({type: "DECREASE"})}>Decrease</button>
      <button onClick={() => dispatch({type: "CUSTOM", payload: 5})}>Custom</button>
    </>
  );
};

export default Counter;
