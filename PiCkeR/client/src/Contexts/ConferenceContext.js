import React, { useState, useEffect, useRef, createContext, useContext } from "react";
import { AuthenticationContext } from "./Authentication";

const noTopic = "--No topic is selected--";
const title = "PiCkeR";
const useConstructor = (callBack = () => {}) => {
  const hasBeenCalled = useRef(false);
  if (hasBeenCalled.current) return;
  callBack();
  hasBeenCalled.current = true;
};

export const ConferenceContext = createContext();

const ConferenceContextProvider = (props) => {
  const [isPaperLoaded, setPaperLoaded] = useState(false);
  const [paperIdx, setPaper] = useState(0);
  const [papers, setPapers] = useState([]);
  const [topics, setTopics] = useState([{}]);
  const [topicLists, setTopicLists] = useState({});
  const [pclistcombined, setPCListCombined] = useState([]);
  const [maxscore, setMaxscore] = useState(0);
  const [topicsidx, setTopicsIdx] = useState([]);

  const { auth, isAuthenticated, isLoading, loginWithRedirect } = useContext(AuthenticationContext);

  const updateCombined = (topic, shuffle, index, weight) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topic: topic,
        shuffle: shuffle,
        index: index,
        weight: weight,
        combined: true,
      }),
    };
    fetch("/pclists", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        var newpclist = data.pclist;
        setPCListCombined(newpclist);
      });
  };

  const updatePaper = (paper) => {
    updateTopicLists(paper);
    setPaper(paper);
  };

  const updateTopic = (topic, shuffle, index, weight) => {
    console.log("Requesting topic index: ", index);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topic: topic,
        shuffle: shuffle,
        index: index,
        weight: weight,
        combined: false,
      }),
    };
    fetch("/pclists", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        var newpclist = { 1: data["1"], 2: data["2"] };
        var index = data.index;
        var weight = data.weight;
        var newentry = [];
        newentry[index] = { t: topic, w: weight, pclist: newpclist };
        setTopicLists((prevState) => ({
          ...prevState,
          ...newentry,
        }));
      });
  };

  const updateTopicLists = (paper) => {
    for (let index = 0; index < papers[paper].topics.length; index++) {
      const topic = papers[paper].topics[index];
      var weight = 2;
      if (topic === noTopic) {
        weight = 0;
      }
      updateTopic(topic, false, index, weight);
    }
  };

  const onShuffleTopic = (index) => {
    updateTopic(topicLists[index].t, true, index, topicLists[index].w);
  };

  const onShuffleCombined = () => {
    var topics = [];
    var weights = [];
    for (const [key, topic] of Object.entries(topicLists)) {
      console.log("TopicList", key, topic);
      topics.push(topic.t);
      weights.push(topic.w);
    }
    updateCombined(topics, true, 0, weights);
  };

  const onTopicChange = (index, value) => {
    var topic = value;
    console.log("On Topic Change, idx:", index, topicLists);
    var weight = topicLists[index].w;

    if (value === noTopic) {
      weight = 0;
    } else if (weight == 0) {
      weight = 2;
    }
    updateTopic(topic, false, index, weight);
  };

  const onWeightChange = (idx, value) => {
    var tl = { ...topicLists };
    var topic = topicLists[idx].t;
    var pclist = topicLists[idx].pclist;
    var weight = value;
    tl[idx] = { t: topic, w: weight, pclist: pclist };
    setTopicLists(tl);
  };

  useConstructor(() => {
    console.log("Init app ...");

    document.title = title;

    fetch("/papers")
      .then((res) => res.json())
      .then((data) => {
        console.log("Papers");
        setPapers(data.papers);
      });
    fetch("/topics")
      .then((res) => res.json())
      .then((data) => {
        console.log("Topics");
        setTopics(data.topics);
      });
  });
  useEffect(() => {
    if (auth && !isLoading && !isAuthenticated) {
      loginWithRedirect({
        appState: {
          targetUrl: window.location.href,
        },
      });
    }
  }, [isLoading, isAuthenticated]);

  useEffect(() => {
    console.log(
      "Papers: First item is",
      Object.keys(papers)[0],
      Object.keys(papers).length,
      papers
    );
    if (Object.keys(papers).length > 0) {
      updatePaper(Object.keys(papers)[0]);
      setPaperLoaded(true);

    }
  }, [papers]);

  useEffect(() => {
    console.log("Updated topiclists: ", topicLists);
    console.log("Requesting combined list");
    var topics = [];
    var weights = [];
    var newmaxscore = 0;
    var newtopicsidx = [];

    for (const [key, topic] of Object.entries(topicLists)) {
      console.log("TopicList", key, topic);
      topics.push(topic.t);
      weights.push(topic.w);
      newtopicsidx.push(key);
      newmaxscore += topic.w;
    }
    setMaxscore(newmaxscore * 2);
    setTopicsIdx(newtopicsidx);
    updateCombined(topics, false, 0, weights);
  }, [topicLists]);

  return (
    <ConferenceContext.Provider value={{ 
      isPaperLoaded, 
      paperIdx,
      papers,
      topics,
      topicLists,
      pclistcombined,
      maxscore,
      topicsidx,
      updateCombined,
      updatePaper, 
      updateTopic,
      updateTopicLists,
      onShuffleTopic,
      onShuffleCombined,
      onTopicChange,
      onWeightChange
    }}>
    {props.children}
  </ConferenceContext.Provider>
  )
};

export default ConferenceContextProvider;
