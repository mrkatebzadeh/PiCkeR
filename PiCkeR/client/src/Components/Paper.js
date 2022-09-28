import React, { useState, useContext } from 'react';
import { ConferenceContext } from '../Contexts/ConferenceContext';

import '../Styles/Paper.css';

function Paper() {
    const {papers, paperIdx, isPaperLoaded} = useContext(ConferenceContext);
    const [showmore, setShowmore] = useState(false)
    const [showauthors, setShowauthors] = useState(false)

    if (!isPaperLoaded) {

        return (
            <div className="paper"> 
            <div className='paperinfo'>
                <h4> No paper is loaded yet. </h4>
            </div>
            </div>
        );
    }

    var paper = {
        id: papers[paperIdx].id ?? '',
        title: papers[paperIdx].title ?? '',
        abstract: papers[paperIdx].abstract ?? '',
        authors: papers[paperIdx].authors ?? []
    }
    

    var options = []
    for (let index = 0; index < paper?.authors.length; index++) {
        const author = paper.authors[index];
        options.push({
            value: index, label: `${author.first} ${author.last} (${author.affiliation})`,
        })
    }

    const toggleShowmore = () => {
        if (showmore) {
            setShowauthors(false)
        }
        setShowmore(prevstate => !prevstate)
    }
    const toggleShowauthors = () => {
        setShowauthors(prevstate => !prevstate)
    }
    return (
        <div className="paper">
            <div className='paperinfo'>
                <h4> ID: {paper.id} </h4>
                <h4> Title: {paper.title} </h4>
                <div id="abstract">
                    <h4>Abstract:</h4> <p className={`${!showmore ? "short" : ""}`}> {paper.abstract} </p>
                </div>
            </div>
            {showmore &&
                <div className='morebox'>
                    <button className='btn' onClick={toggleShowauthors}> {!showauthors && <>Show</>} {showauthors && <>Hide</>} Authors</button>
                    {showauthors && (
                        <div className='authors'>

                            <table>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Author</th>
                                        <th>Affiliation</th>
                                    </tr>
                                </thead>
                                {paper.authors.map((author, idx) => {

                                    return <tr>
                                        <td>{idx + 1}</td>
                                        <td>
                                            {author.first} {author.last}
                                        </td>
                                        <td>
                                            {author.affiliation}
                                        </td>
                                    </tr>
                                })}
                            </table>
                        </div>
                    )}
                </div>
            }
            <button className='btn' onClick={toggleShowmore}> {!showmore && <>More</>} {showmore && <>Less</>}</button>

        </div>
    );
}

export default Paper;