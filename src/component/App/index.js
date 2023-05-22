import moment from "moment";
import {useEffect, useState} from "react";
import React from "react";
import {Header} from "../Header";
import Monitor from "../Monitor";
import CalendarGrid from "../CalendarGrid";
import styled from "styled-components";
import {DISPLAY_MODE_DAY, DISPLAY_MODE_MONTH} from "../../helpers/constants";
import {DayShowComponent} from "../DayShowComponent";
import {ButtonsWrapper, ButtonWrapper, EventBody, EventTitle} from "../../containers/StyledComponents";
const ShadowWrapper = styled.div`
  min-width:900px;
  height: 650px;
  border-radius:8px;
  overflow:hidden;
  border-top:1px solid #737374;
  border-bottom:2px solid #464648;
  bottom-left:1px solid #464648;
  bottom-right:1px #464648;
  border-radius: 8px;
  box-shadow: 0 0 0 1px #1A1A1A, 0 8px 20px 6px #888 ;
  display: flex;
  flex-direction: column; 
`
const FormPositionWrapper = styled.div`
  position:absolute;
  z-index: 100;
  background-color: rgba(0,0,0,0.35);
  top:0;
  right:0;
  bottom:0;
  left:0;
  display:flex;
  align-items: center;
  justify-content: center;
`
const FormWrapper = styled(ShadowWrapper)`
  width:320px;
  min-width: 320px;
  height: 132px;
  background-color:#1E1F21;
  color:#DDDDDD;
  box-shadow: unset;
`

const url='http://localhost:5000'

const defaultEvent = {
    title:'',
    description:'',
    date:moment().format('X')
}
function App() {
    const [displayMode,setDisplayMode]=useState(DISPLAY_MODE_MONTH);
    const totalDays = 42;
    moment.updateLocale({week:{dow:1}});
    const [method,setMethod]=useState(null)
    const [today,setToday]=useState(moment());
    const startDay = today.clone().startOf('month').startOf('week');
    const [events,setEvents]=useState([])
    const [event,setEvent]=useState(null)
    const [isShowForm,setShowForm]=useState(false)
    const prevHandler = ()=>setToday(prev=>prev.clone().subtract(1,displayMode));
    const todayHandler = ()=>setToday(moment())
    const nextHandler = ()=>setToday(prev=>prev.clone().add(1,displayMode))
    const startDayQuery = startDay.clone().format('X')
    const endDayQuery = startDay.clone().add(42,'days').format('X')
    useEffect(()=>{
        fetch(`${url}/events?date_gte=${startDayQuery}&date_lte=${endDayQuery}`)
            .then(res=>res.json())
            .then(res=>{
                console.log(res)
                setEvents(res)
            })
    },[today]);

    const openFormHandler = (methodName ,eventFormUpdate,dayItem)=>{
        setEvent(eventFormUpdate || {...defaultEvent,date:dayItem.format('X')})
        setMethod(methodName)
    }
    const openModalFormHandler = (methodName ,eventFormUpdate,dayItem)=>{
        setShowForm(true)
        openFormHandler(methodName,eventFormUpdate,dayItem)
    }
    const cancelButtonHandler = ()=>{
        setShowForm(false)
        setEvent(null)
    }
    const changeEventHandler = (text,field)=>{
        setEvent(prev=>({
            ...prev,
            [field]:text
        }))
    }
    const eventFetchHandler = ()=>{
        const fetchUrl = method === 'Update' ? `${url}/events/${event.id}` : `${url}/events`;
        const httpMethod = method === 'Update' ? 'PATCH' : 'POST'
        fetch(fetchUrl,{
            method:httpMethod,
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(event),
            }
            )
            .then(res=>res.json())
            .then(res=>{
                console.log(res)
                if (method === 'Update'){
                    setEvents(prevState => prevState.map(eventElement=>eventElement.id===res.id ? res : eventElement))
                }else{
                    setEvents(prevState => [...prevState,res])
                }
                cancelButtonHandler()
            })
    }

    const removeButtonHandler = () =>{
        const fetchUrl = `${url}/events/${event.id}`;
        const httpMethod = 'DELETE'
        fetch(fetchUrl,{
                method:httpMethod,
                headers: {
                    'Content-Type':'application/json'
                },
            }
        )
            .then(res=>res.json())
            .then(res=>{
                setEvents(prevState => prevState.filter(eventEl => eventEl.id !== event.id))
                cancelButtonHandler()
            })
    }
    return (
        <>
            {
                isShowForm ? (
                    <FormPositionWrapper onClick={cancelButtonHandler}>
                        <FormWrapper onClick={e=>e.stopPropagation()}>
                            <EventTitle
                                value={event.title}
                                onChange={e=>changeEventHandler(e.target.value,'title')}
                                placeholder='Title'
                            />
                            <EventBody
                                value={event.description}
                                onChange={e=>changeEventHandler(e.target.value,'description')}
                                placeholder='Description'
                            />
                            <ButtonsWrapper>
                                <ButtonWrapper onClick={cancelButtonHandler}>Cancel</ButtonWrapper>
                                <ButtonWrapper onClick={eventFetchHandler}>{method}</ButtonWrapper>
                                {
                                    method === 'Update' ? <ButtonWrapper danger onClick={removeButtonHandler}>Remove</ButtonWrapper> : null
                                }
                            </ButtonsWrapper>
                        </FormWrapper>
                    </FormPositionWrapper>
                ) : null
            }
            <ShadowWrapper>
                <Header/>
                <Monitor
                    today={today}
                    prevHandler={prevHandler}
                    todayHandler={todayHandler}
                    nextHandler={nextHandler}
                    setDisplayMode={setDisplayMode}
                    displayMode={displayMode}
                />
                {
                    displayMode === DISPLAY_MODE_MONTH ? (
                        <CalendarGrid startDay={startDay} today={today} totalDays={totalDays} events={events} openFormHandler={openModalFormHandler} setDisplayMode={setDisplayMode}/>
                    ) : null
                }
                {
                    displayMode === DISPLAY_MODE_DAY ? (
                        <DayShowComponent
                            events={events}
                            today={today}
                            selectedEvent={event}
                            setEvent={setEvent}
                            changeEventHandler={changeEventHandler}
                            cancelButtonHandle={cancelButtonHandler}
                            eventFetchHandler={eventFetchHandler}
                            removeButtonHandler={removeButtonHandler}
                            method={method}
                            openFormHandler={openFormHandler}
                        />
                    ) : null
                }
            </ShadowWrapper>
        </>
    );
}

export default App;
