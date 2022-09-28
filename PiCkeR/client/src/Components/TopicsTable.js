import React, { useContext } from "react";
import Topic from "./Topic";
import "../Styles/Topics.css";
import { ConferenceContext } from "../Contexts/ConferenceContext";

const TopicsTable = () => {
  const { topicLists, onTopicChange, onWeightChange, topics } =
    useContext(ConferenceContext);

  return (
    <div className="topics">
      <table className="tabletopics">
        <thead>
          <tr>
            <th></th>
            <th>Topic</th>

            <th>Weight</th>
          </tr>
        </thead>

        {Object.keys(topicLists).map((key, index) => {
          return (
            <Topic
              key={index + topicLists[key].t}
              idx={index}
              topics={topics}
              defaultTopic={topicLists[key].t}
              defaultWeight={topicLists[key].w}
              onTopicChange={onTopicChange}
              onWeightChange={onWeightChange}
            />
          );
        })}
      </table>
    </div>
  );
};

export default TopicsTable;
