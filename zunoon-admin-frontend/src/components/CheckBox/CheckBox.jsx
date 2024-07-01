import React, { useState } from "react";
import { useController } from "react-hook-form";
import styles from "./CheckBox.module.scss";

const CheckBox = ({ label, control, options, name, required = false }) => {
  const { field } = useController({
    control,
    name,
  });

  const [value, setValue] = useState(field.value || []);

  return (
    <div className={styles.main}>
      <div className={styles.labelCon}>
        {label && <label htmlFor={name}>{label}</label>}
        {required && <span>*</span>}
      </div>
      <div className={styles.options}>
        {options?.map((option, index) => (
          <label key={Object.keys(option)[0]}>
            <input
              onChange={e => {
                const valueCopy = [...value];

                // update checkbox value
                valueCopy[index] = e.target.checked ? e.target.value : null;
                // send data to react hook form
                field.onChange(valueCopy);

                // update local state
                setValue(valueCopy);
              }}
              key={Object.keys(option)[0]}
              checked={value.includes(Object.keys(option)[0])}
              type="checkbox"
              value={Object.keys(option)[0]}
            />
            {Object.values(option)[1]}
          </label>
        ))}
      </div>
    </div>
  );
};

export default CheckBox;
