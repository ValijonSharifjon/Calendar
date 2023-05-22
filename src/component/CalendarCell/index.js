import React from "react";
import {isCurrent, isSelectedMonth} from "../../helpers";
import {CellWrapper, RowInCell} from "../../containers/StyledComponents";
import styled from "styled-components";
import {DISPLAY_MODE_DAY} from "../../helpers/constants";
const DayWrapper = styled.div`
  width:33px; 
  height: 33px;
  display:flex;
  align-items: center;
  justify-content: center;
  cursor:pointer;
`
const CurrentDay = styled.div`
  height:100%;
  width:100%;
  background-color: #f00;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ShowDayWrapper = styled.div`
    display:flex;
    justify-content: flex-end;
`
const EventListWrapper = styled.ul`
  murgin:0;
  padding: 0;
  list-style: none ;
`
const EventListItemWrapper = styled.li`
  padding-right: 2px;
  padding-left: 2px;
  padding-bottom: 2px;
  display: flex;
`
const EventItemWrapper = styled.button`
  position: relative;
  flex-grow: 1;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width:114px;
  border:unset;
  color:#DDDDDD;
  cursor: pointer;
  margin:0;
  padding:0;
  text-align: left;
  background-color: #5d5f63;
  border:1px solid  #5d5f63;
  border-radius: 2px;
`
export const CalendarCell =({dayItem,today,openFormHandler,events,setDisplayMode })=>{
    return (
        <>
            <CellWrapper  isWeakend={dayItem.day() === 6 || dayItem.day()===0}
                          isSelectedMonth={isSelectedMonth(dayItem,today)}
            >
                <RowInCell justifyContent={'flex-end'}>
                    <ShowDayWrapper>
                        <DayWrapper onDoubleClick={
                            (e)=>openFormHandler('Create',null,dayItem)}>
                            {
                                isCurrent(dayItem) ? (<CurrentDay>{dayItem.format('D')}</CurrentDay>) : (dayItem.format('D'))
                            }
                        </DayWrapper>
                    </ShowDayWrapper>
                    <EventListWrapper>
                        {
                            events
                                .slice(0,1)
                                .map(event=>(
                                    <EventListItemWrapper key={event.id}>
                                        <EventItemWrapper onDoubleClick={()=>openFormHandler('Update',event)}>
                                            {event.title}
                                        </EventItemWrapper>
                                    </EventListItemWrapper>
                                ))
                        }
                        {
                            events.length>2 ? (
                                <EventListItemWrapper key='show more'>
                                    <EventItemWrapper onClick={()=>setDisplayMode(DISPLAY_MODE_DAY)}>
                                        show more...
                                    </EventItemWrapper>
                                </EventListItemWrapper>
                            ):null
                        }
                    </EventListWrapper>
                </RowInCell>
            </CellWrapper>
        </>
    )
}