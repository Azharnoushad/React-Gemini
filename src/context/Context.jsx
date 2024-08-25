import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const AppContext = ({ children }) => {
  const [input, setInput] = useState("");
  const [resendPrompt, setResendPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prevState) => prevState + nextWord);
    }, 75 * index);
  };

  const onSend = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response;
    if (prompt !== undefined) {
      response = await run(prompt);
      setResendPrompt(prompt);
    } else {
      setPrevPrompt((prevState) => [...prevState, input]);
      setResendPrompt(input);
      response = await run(input);
    }
    setResendPrompt(input);
    setPrevPrompt((prevState) => [...prevState, input]);

    let responseArray = response.split("**");
    let newArray = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newArray += responseArray[i];
      } else {
        newArray += "<b>" + responseArray[i] + "</b>";
      }
    }

    let newResponse2 = newArray.split("*").join("<br/>");
    let newResponseArray = newResponse2.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }
    setLoading(false);
    setInput("");
  };

  const contextValue = {
    prevPrompt,
    setPrevPrompt,
    onSend,
    resendPrompt,
    setResendPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default AppContext;
