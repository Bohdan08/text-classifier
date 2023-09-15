import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [inputVal, setInputVal] = useState("");
  const [responseData, setResponseData] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    if (status !== "loading") {
      setStatus("loading");
      // fetch("/8000");
      fetch(`/api/classify?text=${inputVal}`)
        .then((response) => response.json())
        .then((data) => {
          setStatus("success");
          setResponseData(data);
        })
        .catch((error) => {
          setStatus("error");
          setErrorMessage(error.message);
          console.error(error);
        });
    }
  };
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="container m-auto text-center">
        <form onSubmit={onSubmit} className="flex m-auto flex-col items-center w-[500px] max-w-full">
          <h1 className="text-3xl mb-4">Toxic text classification</h1>
          <textarea
            className="p-4 mb-4 rounded border-2 black h-96 w-full"
            value={inputVal}
            onChange={(event) => setInputVal(event.target.value)}
            disabled={status === "loading"}
          />
          {status !== "loading" ? (
            <button
              type="submit"
              className="bg-blue-500 p-4 w-full rounded text-white cursor-pointer hover:bg-blue-600"
            >
              Submit
            </button>
          ) : null}
          {status === "success" ? (
            <div className="mt-5">{JSON.stringify(responseData)}</div>
          ) : null}
          {status === "loading" ? (
            <div className="mt-5 text-xl">Loading...</div>
          ) : null}
          {status === "error" ? (
            <div className="mt-5 text-xl text-red-500">
              {errorMessage || "Error. Please Try again."}
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
}

export default App;
