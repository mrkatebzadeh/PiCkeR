import React, { useContext } from "react";
import { ConferenceContext } from "../Contexts/ConferenceContext";
import "../Styles/TopBar.css";
import Search from "./Search";
import SettingsButton from "./SettingsButton";

const TopBar = ({ auth }) => {
  const { papers, updatePaper } = useContext(ConferenceContext);
  return (
    <div className="row">
      <div className="column selectize">
        <Search className="selectize-input" key={papers} papers={papers} onChange={updatePaper} />
      </div>
      <div className="column">
        <SettingsButton auth={auth} />
      </div>
    </div>
  );
};

export default TopBar;
