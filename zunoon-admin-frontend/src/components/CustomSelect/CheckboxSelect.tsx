import React, { useState } from 'react';
import { useController } from 'react-hook-form';

type propsType = {
    name?: string;
    index: string;
    control: boolean;
};


export default function CheckboxSelect(props: propsType) {
    const { name, index, control } = props;

    const [value, setValue] = useState([]);

    const handleChange = e => {
        const valueCopy = [...value]
        valueCopy[index] = e.target.checked ? e.target.value : null;
        setValue(valueCopy)
    }
    return (
        <div style={{ display: "flex" }}>
            <label htmlFor={`custom-checkbox-${index}`}
                style={{
                    fontSize: "1rem", color: "black", paddingLeft: "0.5rem", paddingTop: "0.1rem"
                }}>{name}</label>
            <input
                type="checkbox"
                id={`custom-checkbox-${index}`}
                name={index}
                value={name}
                onChange={handleChange}
                style={{ height: "12px", width: "12px", marginLeft: "5px", marginTop: "5px" }}
            />
        </div>
    );
}
