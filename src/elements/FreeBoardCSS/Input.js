import React from "react";
import styled from "styled-components";
import Text from "./Text";

const Input = (props) => {
  const {
    label,
    placeholder,
    _onChange,
    type,
    width,
    _value,
    textarea,
    title,
  } = props;

  if (title) {
    return <Title placeholder={placeholder} onChange={_onChange}></Title>;
  }
  if (textarea) {
    return <Textarea placeholder={placeholder} onChange={_onChange}></Textarea>;
  }
  return (
    <React.Fragment>
      <Text>{label}</Text>
      <ElInput
        placeholder={placeholder}
        onChange={_onChange}
        type={type}
        id={type}
        width={width}
        value={_value}
      />
    </React.Fragment>
  );
};

Input.defaultProps = {};

const Title = styled.input`
  width: 80%;
  border: none;
  border-bottom: 1px solid black;
  &:focus {
    outline: none;
  }
`;
const Textarea = styled.textarea`
  width: 90%;
  height: 400px;
  max-width: 400px;
  padding: 10px;
  border: none;
  &:focus {
    outline: none;
    resize: none;
  }
`;

const ElInput = styled.input`
  width: ${(props) => props.width};
  box-sizing: border-box;
`;

export default Input;
