import React, { useContext } from "react";
import { ConferenceContext } from "../Contexts/ConferenceContext";
import { ordinalSuffixOf } from "../utility";

function PCListCombined() {
  const { maxscore, topicsidx, onShuffleCombined, pclistcombined } =
    useContext(ConferenceContext);

  return (
    <div className="column">
      <table className="pclist">
        <thead>
          <tr>
            <th>
              Combined (Max = {maxscore})
              {topicsidx.map((topic) => {
                return <>, {ordinalSuffixOf(parseInt(topic) + 1)} </>;
              })}
              <button className="btn" onClick={onShuffleCombined}>
                {" "}
                Shuffle{" "}
              </button>
            </th>
          </tr>
        </thead>
        <tr>
          <ul>
            {pclistcombined?.map((pcmember, indx) => {
              return (
                <>
                  <li className={pcmember[0].tag}>
                    {pcmember[1]}: {pcmember[0].name}
                    {pcmember[2].map((topic) => {
                      return <>, {topic} </>;
                    })}
                  </li>{" "}
                  <hr />{" "}
                </>
              );
            })}
          </ul>
        </tr>
      </table>
    </div>
  );
}

export default PCListCombined;
