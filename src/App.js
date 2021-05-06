/**
 * @author Praveen Reddy
 * @email pr250210@ncr.com
 * @create date 2021-05-03 23:45:24
 * @modify date 2021-05-06 13:38:50
 * @desc [description]
 */
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import TextToSpeechStream from 'text-to-speech-stream';
import moment from 'moment';

import SlotsAvailableAlert from './components/Alert/SlotsAvailableAlert';
import AutomaticSlotBooking from './components/Booking/AutomaticSlotBooking';
import Button from './components/Button/Button';

import './App.css';
import Home from './components/Home/Home';
import Login from './components/Login/Login';

function App() {
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [slotsList18, setSlotsList18] = useState([]);
    const [availableSlots18, setAvailableSlots18] = useState([]);
    const [slotsList45, setSlotsList45] = useState([]);
    const [availableSlots45, setavailableSlots45] = useState([]);
    const [volumeMute18, setVolumeMute18] = useState(true);
    const [volumeMute45, setVolumeMute45] = useState(false);
    const [districtId, setDistrictId] = useState(294);

    const getData = () => {
        setLoading(true);
        var today = moment().format('DD-MM-YYYY');
        let baseUrl =
            'https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByDistrict';

        fetch(baseUrl + '?district_id=' + districtId + '&date=' + today)
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

                setSlotsList18(list18);
                setAvailableSlots18(availableList18);
                setSlotsList45(list45);
                setavailableSlots45(availableList45);
            })
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        if (availableSlots18.length > 0 && volumeMute18) {
            vaccineAvailableVoice('18+');
        }
    }, [availableSlots18]);

    useEffect(() => {
        if (availableSlots45.length > 0 && volumeMute45) {
            vaccineAvailableVoice('45+');
        }
    }, [availableSlots45]);

    useEffect(() => {
        try {
            let token = sessionStorage.getItem('token');
            setToken(token);
        } catch (error) {
            console.log(error);
        }
        getData();
        let fetchInterval = setInterval(() => getData(), 2000);
        return () => {
            clearTimeout(fetchInterval);
        };
    }, [districtId]);

    const vaccineAvailableVoice = (age) => {
        var voice = TextToSpeechStream.getVoiceByName('Alex');

        var synthesizer = new TextToSpeechStream({
            voice: voice,
            pitch: 1,
            rate: 1,
        });

        synthesizer.write('Covid vaccines are available for ' + age);
    };

    const setTokenHandler = (token) => {
        setToken(token);
        sessionStorage.setItem('token', token);
    };

    console.log(token);
    return (
        <Router>
            <div>
                <header>
                    <nav>
                        <ul className="nav-area">
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/slots_available">
                                    Slots available
                                </Link>
                            </li>
                            <li>
                                <Link to="/automatic_booking">Booking</Link>
                            </li>
                        </ul>
                    </nav>
                    <div>{!token && <Login setToken={setTokenHandler} />}</div>
                    <div className="volume-controll">
                        <Button
                            onClick={() => setVolumeMute18(!volumeMute18)}
                            className="icon-button"
                        >
                            <span>18+</span>
                            <i
                                className={`fa fa-volume-${
                                    volumeMute18 ? 'up' : 'off'
                                }`}
                            ></i>
                        </Button>
                        <Button
                            onClick={() => setVolumeMute45(!volumeMute45)}
                            className="icon-button"
                        >
                            <span>45+</span>
                            <i
                                className={`fa fa-volume-${
                                    volumeMute45 ? 'up' : 'off'
                                }`}
                            ></i>
                        </Button>
                    </div>
                </header>
                <div className="row header-baner">
                    <Home token={token} setDistrictId={setDistrictId} />
                    <div className="row right-align my-info">
                        @ Praveen Reddy Reddivari | praveen.reddivari@gmail.com
                        <div className="contact-icons">
                            <a
                                href="https://www.linkedin.com/in/praveen-reddy-b8481b77/"
                                target="_blank"
                                class="fa fa-linkedin"
                            ></a>
                            <a
                                href="https://www.facebook.com/praveen.reddivari"
                                target="_blank"
                                class="fa fa-facebook"
                            ></a>
                            <a
                                href="https://twitter.com/reddivari_9"
                                target="_blank"
                                class="fa fa-twitter"
                            ></a>
                        </div>
                    </div>
                </div>
                <Switch>
                    <Route path="/slots_available">
                        <SlotsAvailableAlert
                            loading={loading}
                            slotsList18={slotsList18}
                            slotsList45={slotsList45}
                            availableSlots18={availableSlots18}
                            availableSlots45={availableSlots45}
                        />
                    </Route>
                    <Route path="/automatic_booking">
                        <AutomaticSlotBooking
                            availableSlots18={availableSlots18}
                            availableSlots45={availableSlots45}
                            token={token}
                            setToken={setTokenHandler}
                        />
                    </Route>
                    <Route path="/">
                        <SlotsAvailableAlert
                            loading={loading}
                            slotsList18={slotsList18}
                            slotsList45={slotsList45}
                            availableSlots18={availableSlots18}
                            availableSlots45={availableSlots45}
                        />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
