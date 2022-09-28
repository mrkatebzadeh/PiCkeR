import React, { useEffect, useState } from 'react';
import '../Styles/Search.css';
import Select from 'react-select'

function Search({papers,onChange}) {
    const [selectedValue, setSelectedValue] = useState({})
    useEffect(() => {
        setSelectedValue(Object.keys(papers)[0])
    }, [papers])
    var options = []
    for (const [key, value] of Object.entries(papers)) {

        options.push({
            value: key, label: key + ': ' + value.title,
        })
    }
   
    return (
        <div className="search">
            <Select 
            defaultValue={options[0]}
            options={options} 
            value={options.find(option => option.value === selectedValue )}
            onChange={(selected) => {
                setSelectedValue(selected.value)
                onChange(selected.value)}} 
            />
        </div>
    );
}

export default Search;