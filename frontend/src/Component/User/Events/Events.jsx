import React, { useState, useEffect } from 'react'
import '../../../Style/users/Events/Events.css'
import Eventcard from './Eventcard.jsx';
// import { Fetchevents } from '../../../Service/Events/Fetchevents';
import GetUserEvent from '../../../Service/Events/Fetchevents';

import filtericon from "../../../Images/filtericon.svg"

const getUserEvent = new GetUserEvent();




export default function UserEvents() {

    const [eventData, setEventData] = useState([]);
    const [filterStartDate, setFilterStartDate] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const [filter, setFilter] = useState(eventData);

    async function fetchData() {
        try {
            const data = await getUserEvent.getAllEvents();
            console.log(data)
            setEventData(data);
            setFilter(data)
        } catch (error) {
            console.error('Error fetching event data:', error);
        }


    }



    useEffect(() => {
        fetchData()
    }, [])



    const myfun = (e) => {

        setFilterStartDate(e.target.value)
        setFilter(eventData)
        console.log("e", e.target.value)
        console.log("saf", filterStartDate)
        const filteredEventsByDate = eventData.filter(event => {
            const eventStartDate = new Date(event.date);
            const filterDateObj = new Date(e.target.value);

            return (
                eventStartDate.getFullYear() === filterDateObj.getFullYear() &&
                eventStartDate.getMonth() === filterDateObj.getMonth() &&
                eventStartDate.getDate() === filterDateObj.getDate()
            );

        });

        setFilter(filteredEventsByDate)

    }

    const search = (e) => {
        setFilter(eventData)
        setFilterStartDate('')
        setSearchQuery(e.target.value)
        const filteredEventsByName = eventData.filter(event => {
            if (!searchQuery) {
                return true;
            }
            console.log("name", event.name.toLowerCase())
            console.log("searchevent", searchQuery.toLowerCase())
            return event.name.toLowerCase().includes(searchQuery.toLowerCase());
        });

        setFilter(filteredEventsByName)
    }


    const handleTodayButtonClick = () => {

        setFilter(eventData)

        const today = new Date();
        console.log(today)
        setFilterStartDate(today);
        const filteredEventsByToday = eventData.filter(event => {
            const eventStartDate = new Date(event.date);
            const filterDateObj = new Date(today);

            return (
                eventStartDate.getFullYear() === filterDateObj.getFullYear() &&
                eventStartDate.getMonth() === filterDateObj.getMonth() &&
                eventStartDate.getDate() === filterDateObj.getDate()
            );


        });

        setFilter(filteredEventsByToday)
    };

    const clearFilter = () => {
        setFilter(eventData)
        setSearchQuery('')
        setFilterStartDate('')
    }


    return (
        <>
            <h1 className='eventsHeading'>
                Upcoming Events
            </h1>
            <div className="contain">
                <div className='filters'>
                    <input
                        className='date'
                        type="date"
                        placeholder='date'
                        value={filterStartDate}
                        onChange={myfun}
                    />

                    <input
                        type="text"
                        placeholder="Search events"
                        value={searchQuery}
                        className='search'
                        onChange={search}
                    />

                    <button onClick={handleTodayButtonClick} className='today'>Today</button>

                    <button onClick={clearFilter} className='clear'>

                        <div className="icon-container-1">

                            <img src={filtericon} alt='filter' />

                            <div className="cross-line"></div>

                        </div>
                    </button>
                </div>

                <div className='scrollable'>

                    {filter.map((event, index) => (
                        <Eventcard key={index} event={event} />
                    ))}
                </div>
            </div>
        </>
    )
}