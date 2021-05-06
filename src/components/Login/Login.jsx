/**
 * @author Praveen Reddy
 * @email pr250210@ncr.com
 * @create date 2021-05-05 19:24:02
 * @modify date 2021-05-05 19:24:02
 * @desc [description]
 */
import React, { useState } from 'react';
import Button from '../Button/Button';
import CryptoJS from 'crypto-js';

function Login({ setToken }) {
    const [mobile, setMobile] = useState(null);
    const [otp, setOtp] = useState(null);
    const [sessionDetails, setSessionDetails] = useState({});

    const getOtp = () => {
        if (!mobile) return;

        fetch('https://cdn-api.co-vin.in/api/v2/auth/generateMobileOTP', {
            body: JSON.stringify({
                mobile: mobile,
                secret:
                    'U2FsdGVkX1/3I5UgN1RozGJtexc1kfsaCKPadSux9LY+cVUADlIDuKn0wCN+Y8iB4ceu6gFxNQ5cCfjm1BsmRQ==',
            }),
            headers: {
                'content-type': 'application/json',
            },
            method: 'POST',
            mode: 'cors',
            credentials: 'omit',
        })
            .then((res) => res.json())
            .then((res) => {
                setSessionDetails({ txnId: res.txnId });
            })
            .catch((error) => console.log(error));
    };
    const verifyOtp = () => {
        if (!otp) return;

        let otpHasKey = CryptoJS.SHA256(otp).toString(CryptoJS.enc.Hex);
        fetch('https://cdn-api.co-vin.in/api/v2/auth/validateMobileOtp', {
            body: JSON.stringify({
                otp: otpHasKey,
                txnId: sessionDetails.txnId,
            }),
            headers: {
                'content-type': 'application/json',
            },
            method: 'POST',
            mode: 'cors',
            credentials: 'omit',
        })
            .then((res) => res.json())
            .then((res) => {
                setSessionDetails({
                    ...sessionDetails,
                    token: res.token,
                });
                if (setToken) setToken(res.token);
            })
            .catch((error) => console.log(error));
    };

    return (
        <div>
            {!sessionDetails.txnId && (
                <div className="row login">
                    <div className="input-label black">Mobile No. </div>
                    <div>
                        <input
                            type="tel"
                            value={mobile}
                            name="mobile"
                            onChange={(e) => setMobile(e.target.value)}
                        />
                    </div>
                    <div>
                        <Button label="Submit" onClick={() => getOtp()} />
                    </div>
                </div>
            )}
            {sessionDetails.txnId && (
                <div className="row otp">
                    <div className="input-label black">Enter OTP </div>
                    <div>
                        <input
                            type="number"
                            value={otp}
                            name="mobile"
                            onChange={(e) => setOtp(e.target.value)}
                        />
                    </div>
                    <div>
                        <Button label="Submit" onClick={() => verifyOtp()} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Login;
