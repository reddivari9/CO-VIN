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
                    <div>
                        Dose 1:{' '}
                        <span
                            className={
                                center.available_capacity_dose1 > 0
                                    ? 'green'
                                    : 'red'
                            }
                        >
                            {center.available_capacity_dose1}
                        </span>
                    </div>
                    <div>
                        Dose 2:{' '}
                        <span
                            className={
                                center.available_capacity_dose2 > 0
                                    ? 'green'
                                    : 'red'
                            }
                        >
                            {center.available_capacity_dose2}
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div>{center.name}</div>
                    <div>{center.pincode}</div>
                    <div>{center.district_name}</div>
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
    synthesizer.cancel();

    synthesizer.write(text);
};

let slotIndex = () => {
    let hour = parseInt(moment().format('HH'));
    let index = 0;
    if (hour <= 7) {
        index = 0;
    } else if (hour <= 9) {
        index = 1;
    } else if (hour <= 11) {
        index = 2;
    } else if (hour <= 12) {
        index = 3;
    }

    return index;
};
function AutomaticSlotBooking({
    availableSlots18,
    availableSlots45,
    token,
    setToken,
    age,
    dose,
}) {
    const [benificiaryList, setBenificiaryList] = useState([]);
    const [selectedBeneficiaryList, setSelectedBeneficiaryList] = useState([]);
    const [shouldSchedule, setShouldSchedule] = useState(false);
    const [isScheduling, setIsScheduling] = useState(false);
    const [appointmentId, setAppointmentId] = useState(null);
    const [scheduleStatusMessage, setScheduleStatusMessage] = useState(null);
    const [captcha, setCaptcha] = useState('');
    const [slotDetails, setSlotDetails] = useState({});
    const [isGettingCaptcha, setisGettingCaptcha] = useState(false);
    const [slotsList, setSlotsList] = useState([]);

    useEffect(() => {
        getBeneficiary();
        let sessionExpiryalert = setInterval(() => {
            getBeneficiary();
        }, 600000);

        return () => {
            clearTimeout(sessionExpiryalert);
        };
    }, []);

    useEffect(() => {
        setSelectedBeneficiaryList([]);
        setShouldSchedule(false);
    }, [age]);

    useEffect(() => {
        if (age === 18) {
            setSlotsList(availableSlots18);
        }
        if (age === 45) {
            setSlotsList(availableSlots45);
        }
    }, [availableSlots18, availableSlots45]);

    useEffect(() => {
        if (
            slotsList.length > 0 &&
            selectedBeneficiaryList.length &&
            shouldSchedule
        ) {
            let isSending = false;
            slotsList.forEach((item) => {
                if (
                    item.available_capacity >= selectedBeneficiaryList.length &&
                    !isSending &&
                    !isGettingCaptcha
                ) {
                    isSending = true;
                    // schedule(item);
                    setSlotDetails(item);
                    getReCaptcha(item);
                    setisGettingCaptcha(true);
                }
            });
        }
    }, [slotsList]);

    useEffect(() => {
        getBeneficiary();
    }, [token]);

    const getReCaptcha = () => {
        fetch('https://www.cowin.gov.in/api/v2/auth/getRecaptcha', {
            headers: {
                authorization: 'Bearer ' + token,
            },
            mode: 'cors',
            method: 'POST',
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.captcha) {
                    let captcha = res.captcha.replace(/\\/gi);
                    document.querySelector('.captcha-svg').innerHTML = captcha;
                }
            })
            .catch((error) => {
                console.log(error);
                // setToken(null);
                // sessionExpiryVoice('Session expired');
            });
    };

    const getBeneficiary = () => {
        if (!token) {
            return;
        }

        fetch('https://www.cowin.gov.in/api/v2/appointment/beneficiaries', {
            headers: {
                authorization: 'Bearer ' + token,
            },
        })
            .then((res) => res.json())
            .then((res) => {
                setScheduleStatusMessage(null);
                setBenificiaryList(res.beneficiaries);
            })
            .catch((error) => {
                console.log(error);
                setToken(null);
                sessionExpiryVoice('Session expired');
            });
    };

    const schedule = (centerData) => {
        if (!token && selectedBeneficiaryList.length === 0) {
            return;
        }

        let today = moment().format('DD-MM-YYYY');
        let isToday = moment(today).isSame(centerData.date, 'day');
        let index = 0;
        if (isToday) {
            index = slotIndex();
        }

        setIsScheduling(true);
        fetch('https://www.cowin.gov.in/api/v2/appointment/schedule', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            mode: 'cors',
            body: JSON.stringify({
                dose: dose,
                session_id: centerData.session_id,
                center_id: centerData.center_id,
                slot: centerData.slots[index],
                beneficiaries: selectedBeneficiaryList,
                captcha: captcha,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.error) {
                    if (res.error === 'Please enter valid security code') {
                        getReCaptcha();
                        setCaptcha('');
                    }
                    sessionExpiryVoice(
                        res.error ||
                            'Oops! Something went wrong. Please try again.'
                    );
                    setScheduleStatusMessage({
                        type: 'error',
                        msg: res.error,
                    });
                } else {
                    setAppointmentId(res);
                    setSelectedBeneficiaryList([]);
                    setScheduleStatusMessage({
                        type: 'success',
                        msg: 'Your booking is successfully completed',
                    });
                    sessionExpiryVoice(
                        'Your booking is successfully completed for ' +
                            centerData.date +
                            ' on ' +
                            centerData.slots[index]
                    );
                    document.querySelector('.captcha-svg').innerHTML = '';
                    setCaptcha('');
                }
            })
            .catch((error) => console.log(error))
            .finally(() => {
                setScheduleStatusMessage({
                    type: 'error',
                    msg: 'Oops!! Something went wrong please try again',
                });
                setCaptcha('');
                setIsScheduling(false);
                getBeneficiary();
                setShouldSchedule(false);
                setisGettingCaptcha(false);
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

    return (
        <>
            {scheduleStatusMessage && (
                <div className={`banner ${scheduleStatusMessage.type}`}>
                    {scheduleStatusMessage.msg}
                </div>
            )}

            <div className="App-header">
                <div className="available-container">
                    <h2 className="title">Slots Available ({age}+)</h2>
                    {slotsList.length === 0 ? (
                        <div className="loader">No slots available</div>
                    ) : (
                        <div>{slotsList.map(renderList)}</div>
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
                                let _age =
                                    parseInt(moment().format('YYYY')) -
                                    parseInt(beneficiary.birth_year);
                                if (age === 18 && _age >= 45) {
                                    return null;
                                }
                                if (age === 45 && _age < 45) {
                                    return null;
                                }
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
                                        <div>{_age}</div>
                                        <div>
                                            {beneficiary.appointments.length}{' '}
                                            appointments
                                        </div>
                                    </div>
                                );
                            })}
                            <div className="row">
                                <Button
                                    label="Start Auto Book"
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
                                    ? 'Please wait until you receive Captcha ones slots available.'
                                    : "Please select Beneficiary's and click on 'Start Auto Book' Button"}
                            </div>
                            <br />
                            <div className="captcha">
                                <div className="black">
                                    Enter captcha ones you receive it
                                </div>
                                <div className="row">
                                    <div className="captcha-svg"></div>
                                    <input
                                        onChange={(e) => {
                                            setCaptcha(e.target.value);
                                        }}
                                        value={captcha}
                                    />
                                    <Button
                                        label="Submit & book now"
                                        onClick={() => {
                                            schedule(slotDetails);
                                        }}
                                    />
                                </div>
                                <br />
                                <div className="black">
                                    <strong>Note: </strong> Captcha will be
                                    available if you select Beneficiary's and
                                    click on 'Start Auto Book' Button and ones
                                    slots are available
                                </div>
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
