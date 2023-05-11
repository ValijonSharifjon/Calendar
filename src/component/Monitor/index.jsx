import React from "react";
import styled from "styled-components";
const DivWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #1E1F21;
  color:#DDDCDD;
  padding:16px;
`
const TextWrapper = styled.span`
    font-size: 32px;
`
const TitleWrapper = styled(TextWrapper)`
    font-weight: bold;
    margin-right: 8px;
`
const ButtonsWrapper = styled.div`
    display:flex;
    align-items: center;
`
const ButtonWrapper = styled.button`
    border:unset;
  background-color: #565759;
  height:28px;
  margin-right: 2px;
  border-radius:4px;
  color:#E6E6E6;
  outline: unset;
  cursor:pointer;
`
const TodayButton = styled(ButtonWrapper)`
  padding-left: 16px;
  padding-right: 16px;
  font-weight: bold;
`
const Monitor = ({today,prevHandler,todayHandler,nextHandler})=>{
    return(
        <DivWrapper>
            <div>
                <TitleWrapper>{today.format('MMMM')}</TitleWrapper>
                <TextWrapper>{today.format('YYYY')}</TextWrapper>
            </div>
            <div>
                <ButtonWrapper onClick={prevHandler}>&lt;</ButtonWrapper>
                <TodayButton onClick={todayHandler}>today</TodayButton>
                <ButtonWrapper onClick={nextHandler}>&gt;</ButtonWrapper>
            </div>
        </DivWrapper>
    )
}
export default Monitor