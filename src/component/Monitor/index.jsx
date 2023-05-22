import React from "react";
import styled from "styled-components";
import {DISPLAY_MODE_DAY, DISPLAY_MODE_MONTH} from "../../helpers/constants";
const DivWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #1E1F21;
  color:#DDDCDD;
  padding:16px;
  position: relative;
`
const TextWrapper = styled.span`
    font-size: 32px;
`
const TitleWrapper = styled(TextWrapper)`
    font-weight: bold;
    margin-right: 8px;
  margin-left: 8px;
`
const ButtonsWrapper = styled.div`
    display:flex;
    align-items: center;
`
const ButtonsCenterWrapper = styled(ButtonsWrapper)`
  position: absolute;
  top:50%;
  right: 50%;
  transform: translate(50%,-50%);
`
const ButtonWrapper = styled.button`
  border:unset;
  background-color: ${props=>props.unPressed ? '#27282A' : '#565759'};
  border:1px solid #565759;
  height:20px;
  margin-right: 2px;
  border-radius:4px;
  color:${props=>props.unPressed ? '#a4a6a9' : '#E6E6E6'};
  outline: unset;
  cursor:pointer;
  &:not(:last-child){
    margin-right: 2px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  `

const TodayButton = styled(ButtonWrapper)`
  padding-left: 16px;
  padding-right: 16px;
  font-weight: bold;
`
const Monitor = ({today,prevHandler,todayHandler,nextHandler,setDisplayMode,displayMode})=>{
    return(
        <DivWrapper>
            <div>
                {
                    displayMode ===DISPLAY_MODE_DAY ? (
                        <TitleWrapper>{today.format('DD')}</TitleWrapper>
                    ):null
                }
                <TitleWrapper>{today.format('MMMM')}</TitleWrapper>
                <TextWrapper>{today.format('YYYY')}</TextWrapper>
            </div>
            <ButtonsCenterWrapper>
                <ButtonWrapper unPressed={displayMode === DISPLAY_MODE_MONTH} onClick={()=>setDisplayMode(DISPLAY_MODE_MONTH)}>Month</ButtonWrapper>
                <ButtonWrapper unPressed={displayMode === DISPLAY_MODE_DAY} onClick={()=>setDisplayMode(DISPLAY_MODE_DAY)}>Day</ButtonWrapper>
            </ButtonsCenterWrapper>
            <ButtonsWrapper>
                <ButtonWrapper onClick={prevHandler}>&lt;</ButtonWrapper>
                <TodayButton onClick={todayHandler}>today</TodayButton>
                <ButtonWrapper onClick={nextHandler}>&gt;</ButtonWrapper>
            </ButtonsWrapper>
        </DivWrapper>
    )
}
export default Monitor