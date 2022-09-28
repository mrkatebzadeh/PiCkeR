import React from "react";
import ConferenceContextProvider from "./Contexts/ConferenceContext";
import Home
 from "./Components/Home";
function App() {

  return (
    <ConferenceContextProvider>
      <div className="App">
        <Home />
      </div>
    </ConferenceContextProvider>
  );
}

export default App;
