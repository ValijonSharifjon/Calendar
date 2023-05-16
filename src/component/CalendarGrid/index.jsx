import React from "react";
import styled from "styled-components";
import moment from "moment";

export const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7,1fr);
  grid-gap:1px;
  background-color: ${props=>props.isHeader ? '#1E1F21' : '#404040'};
  ${props=>props.isHeader && 'border-bottom : 1px solid  #404040' }
`
const RowInCell = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${props=>props.justifyContent ? props.justifyContent : 'flex-start'};
  ${props=>props.pr && `padding-right: ${props.pr*8}px`}
`
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
export const CellWrapper = styled.div`
  min-width: 140px;
  min-height:${props=>props.isHeader ? 24 : 80}px;
  background-color: ${(props)=>props.isWeakend ?'#272829': '#1E1F21'};
  color: ${(props)=>props.isSelectedMonth ? '#DDDCDD' : '#555759'};
`
const ShowDayWrapper = styled.div`
    display:flex;
    justify-content: flex-end;
`
const EventListWrapper = styled.ul`
  murgin:unset;
  list-style-position: inside;
  padding-left:4px;
`
const EventItemWrapper = styled.button`
  position: relative;
  left:-14px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width:114px;
  border:unset;
  background: unset;
  color:#DDDDDD;
  cursor: pointer;
  margin:0;
  padding:0;
  text-align: left;
`
const CalendarGrid = ({startDay,today,events,openFormHandler})=>{
    const totalDays = 42;
    const day=startDay.clone();
    const daysMap = [...Array(totalDays)].map(()=>day.add(1,'day').clone())
    const isCurrent = (day)=>moment().isSame(day,'day')
    const isSelectedMonth = (day)=>today.isSame(day,'month')
    return(
        <>
            <GridWrapper isHeader >
                {[...Array(7)].map((_,i)=><CellWrapper isHeader isSelectedMonth key={i}>{
                    <RowInCell justifyContent={'flex-end'} pr={1}>
                        {moment().day(i+1).format('ddd')}
                    </RowInCell>
                }</CellWrapper>)}
            </GridWrapper>
            <GridWrapper>
                {
                    daysMap.map((dayItem)=>(
                        <CellWrapper  isWeakend={dayItem.day() === 6 || dayItem.day()===0}
                                      isSelectedMonth={isSelectedMonth(dayItem)}
                        >
                            <RowInCell justifyContent={'flex-end'}>
                                <ShowDayWrapper>
                                    <DayWrapper onDoubleClick={(e)=>openFormHandler('Create',null,dayItem)}>
                                        {
                                            isCurrent(dayItem) ? (<CurrentDay>{dayItem.format('D')}</CurrentDay>) : (dayItem.format('D'))
                                        }
                                    </DayWrapper>
                                </ShowDayWrapper>
                                <EventListWrapper>
                                    {
                                        events
                                            .filter(event=>event.date>=dayItem.format('X') && event.date<=dayItem.clone().endOf('day').format('X'))
                                            .map(event=>(
                                                <li key={event.id}>
                                                    <EventItemWrapper onDoubleClick={()=>openFormHandler('Update',event)}>
                                                        {event.title}
                                                    </EventItemWrapper>
                                                </li>
                                            ))
                                    }
                                </EventListWrapper>
                            </RowInCell>
                        </CellWrapper>
                    ))
                }
            </GridWrapper>
        </>
    )
}


export default CalendarGrid