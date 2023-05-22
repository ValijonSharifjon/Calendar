import React from "react";
import { isDayContainCurrentEvent} from "../../helpers";
import {CalendarCell} from "../CalendarCell";

export const MonthDaysList = ({startDay,events,openFormHandler,today,setDisplayMode}) =>{
    const totalDays = 42;
    const day=startDay.clone();
    const daysMap = [...Array(totalDays)].map(()=>day.add(1,'day').clone())
    return (
        <>
            {
                daysMap.map((dayItem)=>(
                    <CalendarCell key={dayItem} dayItem={dayItem} today={today} events={events.filter(event=>isDayContainCurrentEvent(event,dayItem))} openFormHandler={openFormHandler} setDisplayMode={setDisplayMode}/>
                ))
            }
        </>
    )
}