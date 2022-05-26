import exp from "constants";
import styled from "styled-components";

type ContainerProps = {
    showBackground: boolean
}


export const Container = styled.div<ContainerProps> `
    background-color:  ${props => props.showBackground ? '#1550ff' : '#e2e3e3'};
    height: 100px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    
`

type IconsProps = {
    opacity?: number 
}


export const Icon = styled.img<IconsProps> `
    width: 40px;
    height: 40px;
    opacity: ${props => props.opacity ?? 1};
`