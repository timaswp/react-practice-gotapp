import React from "react";
import styled from "styled-components";
import img from './error.jpg';

const ErrorSpan = styled.span`
    color: red;
`;

const ErrorImg = styled.img`
    width: 100%;
`;

const ErrorMessage = () => {
    return (
        <>
            <ErrorImg src={img} alt="error"></ErrorImg>
            <ErrorSpan>Something went wrong ...</ErrorSpan>
        </>
    )
}

export default ErrorMessage;