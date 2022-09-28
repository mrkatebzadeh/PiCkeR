import React, { useContext } from "react";
import { ConferenceContext } from "../Contexts/ConferenceContext";
import PCList from "./PCList";
import PCListCombined from "./PCListCombined";

const PCListsTable = () => {
  const {
    topicLists,
    onShuffleTopic,
  } = useContext(ConferenceContext);
  return (
    <div className="row">
      {Object.keys(topicLists).map((key, index) => {
        console.log(topicLists[key].pclist);
        return (
          <PCList
            key={index}
            index={index}
            onShuffle={onShuffleTopic}
            pclist={topicLists[key].pclist}
          />
        );
      })}
      <PCListCombined />
    </div>
  );
};

export default PCListsTable;
