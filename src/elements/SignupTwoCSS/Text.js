import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const {
    children,
    _onClick,
    inline,
    size
  } = props;

  const style = {
    inline,
    size
  }

  return (
    <P onClick={_onClick} {...style}>
      {children}
    </P>
  );
};

Text.defaultProps = {
  children: null,
  _onClick: () => {},
};

const P = styled.p`
  margin-bottom: 5px;
  font-size: ${props => props.size? props.size: ''};
`;

export default Text;
