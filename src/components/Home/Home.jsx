/**
 * @author Praveen Reddy
 * @email pr250210@ncr.com
 * @create date 2021-05-05 19:05:18
 * @modify date 2021-05-05 19:05:18
 * @desc [description]
 */
import React, { useEffect, useState } from 'react';

function Home({ token }) {
    const [location, setLocation] = useState({
        state: 16,
        district: 29,
    });

    useEffect(() => {
        getState();
        getDistrict();
    }, []);

    const getState = () => {
        fetch('https://cdn-api.co-vin.in/api/v2/admin/location/states')
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
            })
            .catch((error) => console.log(error));
    };
    const getDistrict = () => {
        if (!location.state) return;
        fetch(
            'https://cdn-api.co-vin.in/api/v2/admin/location/districts/' +
                location.state,
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
                console.log(res);
            })
            .catch((error) => console.log(error));
    };
    return <div></div>;
}

export default Home;
