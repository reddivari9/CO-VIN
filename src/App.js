/**
 * @author Praveen Reddy
 * @email pr250210@ncr.com
 * @create date 2021-05-03 23:45:24
 * @modify date 2021-05-04 12:50:19
 * @desc [description]
 */
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import TextToSpeechStream from 'text-to-speech-stream';

import './App.css';

const vaccineAvailableVoice = (age) => {
    console.log('Available voice......');
    TextToSpeechStream.getVoices(); // Return all voice objects
    var voice = TextToSpeechStream.getVoiceByName('Alex');

    var synthesizer = new TextToSpeechStream({
        voice: voice,
        pitch: 1,
        rate: 1,
    });

    synthesizer.write('Covid vaccines are available for ' + age);
};

const renderList = (center) => {
    return (
        <div className="row border-line">
            <div className="updated-time">{moment().format('HH:MM:SS')}</div>

            <div className="column">
                <div className="row">
                    <div>{center.date}</div>
                    <div>{center.vaccine}</div>
                    <div
                        className={
                            center.available_capacity > 0 ? 'green' : 'red'
                        }
                    >
                        {center.available_capacity}
                    </div>
                </div>
                <div className="row">
                    <div>{center.name}</div>
                    <div>{center.pincode}</div>
                    <div>{center.session_id}</div>
                </div>
            </div>
        </div>
    );
};

function App() {
    const [slotsList18, setSlotsList18] = useState([]);
    const [availableSlots18, setAvailableSlots18] = useState([]);
    const [slotsList45, setSlotsList45] = useState([]);
    const [availableSlots45, setavailableSlots45] = useState([]);
    const [loading, setLoading] = useState(true);

    const getData = () => {
        setLoading(true);
        var today = moment().format('DD-MM-YYYY');
        let baseUrl =
            'https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByDistrict';

        fetch(baseUrl + '?district_id=294&date=' + today)
            .then((res) => res.json())
            .then((res) => {
                let list18 = [];
                let availableList18 = [];
                let list45 = [];
                let availableList45 = [];
                res.centers.forEach(({ sessions, ...centerRest }) => {
                    sessions.forEach((session) => {
                        let { min_age_limit, available_capacity } = session;
                        let data = {
                            ...centerRest,
                            ...session,
                        };
                        if (min_age_limit < 45) {
                            list18.push(data);

                            if (available_capacity > 0) {
                                availableList18.push(data);
                            }
                        } else {
                            list45.push(data);

                            if (available_capacity > 0) {
                                availableList45.push(data);
                            }
                        }
                    });
                });

                if (availableList18.length > 0) {
                    vaccineAvailableVoice('18+');
                }

                // if (availableList45.length > 0) {
                //     vaccineAvailableVoice('45+');
                // }

                setSlotsList18(list18);
                setAvailableSlots18([...availableSlots18, ...availableList18]);
                setSlotsList45(list45);
                setavailableSlots45([...availableSlots45, ...availableList45]);
            })
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
    };
    useEffect(() => {
        getData();
        let fetchInterval = setInterval(() => getData(), 10000);
        return () => {
            clearTimeout(fetchInterval);
        };
    }, []);
    return (
        <div>
            <div className="App-header">
                <div className="available-container">
                    <h2 className="title">Slots Available</h2>
                    {availableSlots18.length === 0 ? (
                        <div className="loader">No slots available</div>
                    ) : (
                        <div>{availableSlots18.map(renderList)}</div>
                    )}
                </div>
                <div className="all-centers-container">
                    <h2 className="title">centers for 18+</h2>
                    {loading ? (
                        <div className="loader">Fetching data...</div>
                    ) : (
                        <div>{slotsList18.map(renderList)}</div>
                    )}
                </div>
            </div>
            <div className="App-header">
                <div className="available-container">
                    <h2 className="title">Slots Available</h2>
                    {availableSlots45.length === 0 ? (
                        <div className="loader">No slots available</div>
                    ) : (
                        <div>{availableSlots45.map(renderList)}</div>
                    )}
                </div>
                <div className="all-centers-container">
                    <h2 className="title">centers for 45+</h2>
                    {loading ? (
                        <div className="loader">Fetching data...</div>
                    ) : (
                        <div>{slotsList45.map(renderList)}</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
