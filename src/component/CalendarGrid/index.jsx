import React from "react";
import styled from "styled-components";
import {CalendarGridHeader} from "../CalendarGridHeader";
import {MonthDaysList} from "../MonthDaysList";

export const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7,1fr);
  grid-gap:1px;
  background-color: ${props=>props.isHeader ? '#1E1F21' : '#404040'};
  ${props=>props.isHeader && 'border-bottom : 1px solid  #404040' }
`


const CalendarGrid = ({startDay,today,totalDays,events,openFormHandler,setDisplayMode})=>{
    return(
        <>
            <GridWrapper isHeader >
                <CalendarGridHeader/>
            </GridWrapper>
            <GridWrapper>
                <MonthDaysList totalDays={totalDays} openFormHandler={openFormHandler} events={events} startDay={startDay} today={today} setDisplayMode={setDisplayMode}/>
            </GridWrapper>
        </>
    )
}


export default CalendarGrid