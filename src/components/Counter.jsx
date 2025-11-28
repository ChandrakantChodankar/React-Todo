import { useState } from "react";

export const Counter = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  return (
    <section className="flex flex-col items-center h-screen overflow-hidden bg-gray-700">
      <div className="p-15">
        <h1 className="text-7xl">Counter App</h1>
      </div>
      <div className="m-5 text-5xl text-red-400  ">
        <p>{count}</p>
      </div>
      <div className="text-4xl p-5 m-5 flex gap-10">
        <button
          className="rounded-4xl bg-green-700 hover:bg-green-500 hover:text-green-300 w-55 h-15"
          onClick={handleIncrement}
        >
          Increment
        </button>
        <button
          className="rounded-4xl bg-red-700 hover:bg-red-500 hover:text-red-300 w-55"
          onClick={handleDecrement}
        >
          Decrement
        </button>
      </div>
    </section>
  );
};
