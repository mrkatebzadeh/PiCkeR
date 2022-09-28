import React from 'react';
import {ordinalSuffixOf} from '../utility'

function PCList({ pclist, index, onShuffle }) {

    return (
        <div className='column'>
            <table className="pclist">
                <thead>
                    <tr>
                        <th>
                            {ordinalSuffixOf(index + 1)} Topic 
                            <button className='btn' onClick={() => onShuffle(index)}> Shuffle </button>

                        </th>
                    </tr>
                </thead>
                <tr>
                    <td className='exp'>
                    Exp = 2
                    <hr className='headerhr'/>

                    </td>
                </tr>
                <tr>
                <ul>
                {pclist[2].map((pcmember, indx) => {
                        return <><li className={pcmember.tag}>
                                {pcmember.name}
                            </li> <hr/> </>
                    })
                }
                </ul>
                </tr>
                
                <tr>
                    <td className='exp'>
                     Exp = 1
                     <hr className='headerhr'/>

                    </td>
                </tr>

                <tr>
                <ul>
                {pclist[1].map((pcmember, indx) => {
                        return <><li className={pcmember.tag}>
                                {pcmember.name}
                            </li> <hr/> </>
                    })
                }
                </ul>
                </tr>
                
                
            </table>
        </div>

    );
}

export default PCList;