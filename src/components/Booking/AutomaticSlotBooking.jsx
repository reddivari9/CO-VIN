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
const sessionExpiryVoice = (text) => {
    var voice = TextToSpeechStream.getVoiceByName('Alex');

    var synthesizer = new TextToSpeechStream({
        voice: voice,
        pitch: 1,
        rate: 1,
    });

    synthesizer.write(text);
};
function AutomaticSlotBooking({
    availableSlots18,
    availableSlots45,
    token,
    setToken,
}) {
    const [benificiaryList, setBenificiaryList] = useState([]);
    const [selectedBeneficiaryList, setSelectedBeneficiaryList] = useState([]);
    const [shouldSchedule, setShouldSchedule] = useState(false);
    const [isScheduling, setIsScheduling] = useState(false);
    const [appointmentId, setAppointmentId] = useState(null);

    useEffect(() => {
        let sessionExpiryalert = setInterval(() => {
            getBeneficiary();
        }, 110000);

        setTimeout(() => {
            sessionExpiryVoice('Session expired');
        }, 840000);

        return () => {
            clearTimeout(sessionExpiryalert);
        };
    }, []);

    useEffect(() => {
        if (
            availableSlots18.length > 0 &&
            selectedBeneficiaryList.length &&
            shouldSchedule
        ) {
            let isSending = false;
            availableSlots18.forEach((item) => {
                if (
                    item.available_capacity >= selectedBeneficiaryList.length &&
                    !isSending
                ) {
                    isSending = true;
                    schedule(item);
                }
            });
        }
    }, [availableSlots18]);

    useEffect(() => {
        getBeneficiary();
    }, [token]);

    const getBeneficiary = () => {
        if (!token) {
            return;
        }

        fetch('https://cdn-api.co-vin.in/api/v2/appointment/beneficiaries', {
            headers: {
                authorization: 'Bearer ' + token,
            },
        })
            .then((res) => res.json())
            .then((res) => {
                setBenificiaryList(res.beneficiaries);
            })
            .catch((error) => {
                console.log(error);
                setToken(null);
                sessionExpiryVoice();
            });
    };

    const schedule = (centerData) => {
        if (!token && selectedBeneficiaryList.length === 0) {
            return;
        }
        setIsScheduling(true);
        fetch('https://cdn-api.co-vin.in/api/v2/appointment/schedule', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            'content-type': 'application/json',
            mode: 'cors',
            body: JSON.stringify({
                dose: 1,
                session_id: centerData.session_id,
                center_id: centerData.center_id,
                slot: centerData.slots[0],
                beneficiaries: selectedBeneficiaryList,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                setAppointmentId(res);
                setSelectedBeneficiaryList([]);

                sessionExpiryVoice('Your booking is successfully completed');
            })
            .catch((error) => console.log(error))
            .finally(() => {
                setIsScheduling(false);
                getBeneficiary();
                setShouldSchedule(false);
            });
    };

    const handleBeneficiarySelect = (e, data) => {
        let list = [...selectedBeneficiaryList];
        if (e.target.checked) {
            list.push(data.beneficiary_reference_id);
            list = [...new Array(...new Set(list))];
        } else {
            list = list.filter(
                (item) => data.beneficiary_reference_id !== item
            );
        }

        setSelectedBeneficiaryList(list);
    };

    const handleSubmit = (status) => {
        if (selectedBeneficiaryList.length === 0) {
            setShouldSchedule(false);
            return;
        }
        setShouldSchedule(status);
    };

    console.log(shouldSchedule);

    return (
        <>
            {appointmentId && (
                <div className="banner success">
                    Your booking is successfully completed
                </div>
            )}

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
                    <h2 className="title">Beneficiary Details</h2>
                    {token ? (
                        <div style={{ padding: 10 }}>
                            <div>
                                {selectedBeneficiaryList.length} Selected{' '}
                            </div>
                            {benificiaryList.map((beneficiary) => {
                                let age =
                                    parseInt(moment().format('YYYY')) -
                                    parseInt(beneficiary.birth_year);

                                if (age >= 45) return null;
                                return (
                                    <div className="row border-line be-info">
                                        <div>
                                            <input
                                                disabled={shouldSchedule}
                                                type="checkbox"
                                                onChange={(e) =>
                                                    handleBeneficiarySelect(
                                                        e,
                                                        beneficiary
                                                    )
                                                }
                                                checked={
                                                    selectedBeneficiaryList.indexOf(
                                                        beneficiary.beneficiary_reference_id
                                                    ) !== -1
                                                }
                                            />
                                        </div>
                                        <div>{beneficiary.name}</div>
                                        <div>{age}</div>
                                        <div>
                                            {beneficiary.appointments.length}{' '}
                                            appointments
                                        </div>
                                    </div>
                                );
                            })}
                            <div className="row">
                                <Button
                                    label="Auto Book"
                                    onClick={() => {
                                        handleSubmit(true);
                                    }}
                                />
                                <Button
                                    label="cancel"
                                    onClick={() => {
                                        handleSubmit(false);
                                    }}
                                />
                            </div>
                            <div>
                                {shouldSchedule
                                    ? 'Please wait until automatic booking complete.'
                                    : "Please select Beneficiary's and click on schedule"}
                            </div>
                        </div>
                    ) : (
                        <div className="loader error">Please Login</div>
                    )}
                </div>
            </div>
        </>
    );
}

export default AutomaticSlotBooking;
