import React from "react";

const TextInput = (props) => {
  return (
      <>
    <label>{props.text} : </label>
    <input
      type="text"
      defaultValue={props.defaultValue}
      onChange={(e) => {
        props.onChange(e.target.value);
      }}
    />
    </>
  );
};
export default TextInput;