import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import { ordinalSuffixOf } from '../utility'

function Topic(props) {


    var topicOptions = []
    var weightOptions = []

    const [defaultTopic, setDefaultTopic] = useState(props.defaultTopic)
    const [defaultWeight, setDefaultWeight] = useState(props.defaultWeight)
    const [selectedValue, setSelectedValue] = useState({})

    useEffect(() => { setDefaultTopic(props.defaultTopic) }, [props.defaultTopic])
    useEffect(() => { setDefaultWeight(props.defaultWeight) }, [props.defaultWeight])
    useEffect(() => {
        setSelectedValue(defaultTopic)
    }, [defaultTopic])
    var idx = props.idx

    for (const topic of Object.entries(props.topics)) {
        topicOptions.push({
            value: topic, label: topic,
        })

    }

    for (let index = 0; index < 4; index++) {
        weightOptions.push({
            value: index, label: index,
        })

    }
    console.log(defaultTopic, defaultWeight)

    return (
        <tr>
            <td>
                {ordinalSuffixOf(idx + 1)}
            </td>
            <td>
                <Select
                    className="topicselect"
                    // isSearchable={false}
                    placeholder={defaultTopic}
                    options={topicOptions}
                    value={topicOptions.find(option => option.value[0] === selectedValue )}
                    onChange={selected => {
                    setSelectedValue(selected.value[0])
                    console.log('Changed to ' + selected.value[0])
                    setDefaultTopic(selected.value[0])
                    props.onTopicChange(idx, selected.value[0])
                    }} />
            </td>
            <td>
                <Select className="weightselect" isSearchable={false} placeholder={defaultWeight} options={weightOptions} onChange={selected => {
                    // defaultWeight = selected.weight
                    setDefaultWeight(selected.value)
                    console.log('Changed to ' + selected.value)
                    props.onWeightChange(idx, selected.value)
                }} />
            </td>
        </tr>
    );
}

export default Topic;