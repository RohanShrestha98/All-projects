import React from "react";
import styled from "styled-components";

interface ILoader {
  size?: number;
  color?: string;
}

const LoaderContainer = styled.div<ILoader>`
  width: ${props => (props.size ? props.size : 14)}px;
  height: ${props => (props.size ? props.size : 14)}px;
  border-radius: 50%;
  display: inline-block;
  border-top: 3px solid ${props => (props.color ? props.color : "#00bad6")};
  border-right: 3px solid transparent;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loader = ({ size, color }: ILoader) => {
  return <LoaderContainer size={size} color={color} />;
};

export default Loader;
