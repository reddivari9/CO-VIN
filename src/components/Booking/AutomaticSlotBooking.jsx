/**
 * @author Praveen Reddy
 * @email pr250210@ncr.com
 * @create date 2021-05-04 18:32:01
 * @modify date 2021-05-04 18:32:01
 * @desc [description]
 */
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import TextToSpeechStream from 'text-to-speech-stream';
import Button from '../Button/Button';

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
const sessionExpiryVoice = () => {
    var voice = TextToSpeechStream.getVoiceByName('Alex');

    var synthesizer = new TextToSpeechStream({
        voice: voice,
        pitch: 1,
        rate: 1,
    });

    synthesizer.write('Session expired');
};
function AutomaticSlotBooking({
    loading,
    slotsList18,
    slotsList45,
    availableSlots18,
    availableSlots45,
}) {
    const [benificiaryList, setBenificiaryList] = useState([]);
    const [isScheduling, setIsScheduling] = useState(false);
    const [appointmentId, setAppointmentId] = useState(null);
    const [authToken, setAuthToken] = useState('');
    const [authAlert, setauthAlert] = useState('');

    useEffect(() => {
        let sessionExpiryalert = setInterval(() => {
            getBeneficiary();
        }, 110000);

        setTimeout(() => {
            setAuthToken('');
            sessionExpiryVoice();
        }, 840000);

        return () => {
            clearTimeout(sessionExpiryalert);
        };
    }, []);

    useEffect(() => {
        if (availableSlots18.length > 0 && benificiaryList.length) {
            let isSending = false;
            availableSlots18.forEach((item) => {
                if (
                    item.available_capacity >= benificiaryList.length &&
                    !isScheduling &&
                    !isSending
                ) {
                    isSending = true;
                    schedule(item);
                }
            });
        }
    }, [availableSlots18]);

    useEffect(() => {
        if (authToken.length > 20) getBeneficiary();
    }, [authToken]);

    const getBeneficiary = () => {
        if (!authToken) {
            return;
        }
        setauthAlert('');
        let beneficiaryList = [];
        fetch('https://cdn-api.co-vin.in/api/v2/appointment/beneficiaries', {
            headers: {
                authorization: 'Bearer ' + authToken,
            },
        })
            .then((res) => res.json())
            .then((res) => {
                res.beneficiaries.forEach((beneficiary) => {
                    if (
                        beneficiary.appointments &&
                        beneficiary.appointments.length > 0
                    ) {
                        setAppointmentId(beneficiary.appointments[0]);
                    } else {
                        beneficiaryList.push(
                            beneficiary.beneficiary_reference_id
                        );
                    }
                });
                setBenificiaryList(beneficiaryList);
            })
            .catch((error) => {
                console.log(error);
                setAuthToken('');
                setauthAlert('Please Enter correct Token');
            });
    };

    const schedule = (centerData) => {
        if (!authToken) {
            return;
        }
        setIsScheduling(true);
        fetch('https://cdn-api.co-vin.in/api/v2/appointment/schedule', {
            method: 'POST',
            headers: {
                authorization: 'Bearer ' + authToken,
            },
            body: JSON.stringify({
                dose: 1,
                session_id: centerData.session_id,
                slot: '11:00AM-01:00PM',
                beneficiaries: benificiaryList,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                setAppointmentId(res.appointment_id);
            })
            .catch((error) => console.log(error))
            .finally(() => {
                setIsScheduling(false);
            });
    };

    const handleAuthTokenChange = (e) => {
        let text = e.target.value;
        let token = text.replace(/\"/gi, '').replace('Bearer ', '');
        setAuthToken(`${token}`);
    };

    return (
        <div className="App-header">
            <div className="available-container">
                <h2 className="title">Slots Available (18+)</h2>
                {availableSlots18.length === 0 ? (
                    <div className="loader">No slots available</div>
                ) : (
                    <div>{availableSlots18.map(renderList)}</div>
                )}
            </div>
            <div className="all-centers-container">
                <h2 className="title">Enter Token</h2>
                {authToken ? (
                    <div className="token token-alert">{authToken}</div>
                ) : (
                    <div className="token token-alert error">
                        Please enter Auth Token
                    </div>
                )}

                {authAlert && <div className="error">{authAlert}</div>}
                <div className="token token-input">
                    {/* <label>Token</label> */}
                    <textarea
                        type="text"
                        onChange={handleAuthTokenChange}
                        value={authToken}
                    />
                    {/* <Button label="Add" onClick={() => {}} /> */}
                </div>
            </div>
        </div>
    );
}

export default AutomaticSlotBooking;
