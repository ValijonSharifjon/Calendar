import moment from "moment";
import {useEffect, useState} from "react";
import React from "react";
import {Header} from "../Header";
import Monitor from "../Monitor";
import CalendarGrid from "../CalendarGrid";
import styled from "styled-components";
const ShadowWrapper = styled.div`
  border-radius:8px;
  overflow:hidden;
  border-top:1px solid #737374;
  border-bottom:2px solid #464648;
  bottom-left:1px solid #464648;
  bottom-right:1px #464648;
  box-shadow: 0 0 0 1px #1A1A1A, 0 8px 20px 6px #888 ;
`
const url='http://localhost:5000'
function App() {
    moment.updateLocale({week:{dow:1}});
    const [today,setToday]=useState(moment());
    const startDay = today.clone().startOf('month').startOf('week');
    const [events,setEvents]=useState([])
    const prevHandler = ()=>setToday(prev=>prev.clone().subtract(1,'month'));
    const todayHandler = ()=>setToday(moment())
    const nextHandler = ()=>setToday(prev=>prev.clone().add(1,'month'))
    const startDayQuery = startDay.clone().format('X')
    const endDayQuery = startDay.clone().add(42,'days').format('X')
    useEffect(()=>{
        fetch(`${url}/events?date_gte=${startDayQuery}&date_lte=${endDayQuery}`)
            .then(res=>res.json())
            .then(res=>{
                console.log(res)
                setEvents(res)
            })
    },[today])
    return (
        <ShadowWrapper>
            <Header/>
            <Monitor
                today={today}
                prevHandler={prevHandler}
                todayHandler={todayHandler}
                nextHandler={nextHandler}
            />
            <CalendarGrid startDay={startDay} today={today} events={events}/>
        </ShadowWrapper>
    );
}

export default App;
