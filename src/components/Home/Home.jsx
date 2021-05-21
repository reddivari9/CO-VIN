/**
 * @author Praveen Reddy
 * @email pr250210@ncr.com
 * @create date 2021-05-05 19:05:18
 * @modify date 2021-05-05 19:05:18
 * @desc [description]
 */
import React, { useEffect, useState } from 'react';

function Home({ token, setDistrictId }) {
    const [state, setState] = useState(16);
    const [district, setDistrict] = useState(null);
    const [states, setStates] = useState([]);
    const [districts, setDistricts] = useState([]);

    useEffect(() => {
        getState();
    }, []);

    useEffect(() => {
        getDistrict();
    }, [state]);

    useEffect(() => {
        if (!district) {
            setState(16);
            setDistrict(194);
        } else {
            setDistrictId(district);
        }
    }, [district]);

    const getState = () => {
        fetch('https://cdn-api.co-vin.in/api/v2/admin/location/states')
            .then((res) => res.json())
            .then((res) => {
                if (res.states) {
                    setStates(res.states);
                    if (state === 16 && !district) {
                        setDistrict(294);
                    }
                }
            })
            .catch((error) => console.log(error));
    };
    const getDistrict = () => {
        if (!state) return;
        fetch(
            'https://cdn-api.co-vin.in/api/v2/admin/location/districts/' +
                state,
            {
                headers: {
                    'content-type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
                mode: 'cors',
            }
        )
            .then((res) => res.json())
            .then((res) => {
                if (res.districts) {
                    setDistricts(res.districts);
                    if (state === 16 && !district) {
                        setDistrict(294);
                    } else {
                        setDistrict(res.districts[0].district_id);
                    }
                }
            })
            .catch((error) => console.log(error));
    };

    return (
        <>
            <div>
                <label className="input-label">State</label>
                <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                >
                    {states.map((state) => {
                        return (
                            <option value={state.state_id}>
                                {state.state_name}
                            </option>
                        );
                    })}
                </select>
            </div>
            <div>
                <label className="input-label">District</label>
                <select
                    value={district}
                    onChange={(e) => {
                        setDistrict(e.target.value);
                    }}
                >
                    {districts.map((district) => {
                        return (
                            <option value={district.district_id}>
                                {district.district_name}
                            </option>
                        );
                    })}
                </select>
            </div>
        </>
    );
}

export default Home;
