/**
 * @author Praveen Reddy
 * @email pr250210@ncr.com
 * @create date 2021-05-04 18:32:55
 * @modify date 2021-05-04 18:32:55
 * @desc [description]
 */
import React from 'react';
import moment from 'moment';

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
                    <div>{center.district_name}</div>
                </div>
            </div>
        </div>
    );
};

function SlotsAvailableAlert({
    loading,
    slotsList18,
    slotsList45,
    availableSlots18,
    availableSlots45,
    age,
}) {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: age === 45 ? 'column-reverse' : 'column',
            }}
        >
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
                    <h2 className="title">Centers (18+)</h2>
                    {loading ? (
                        <div className="loader">Fetching data...</div>
                    ) : slotsList18.length === 0 ? (
                        <div className="loader">No Centers available</div>
                    ) : (
                        <div>{slotsList18.map(renderList)}</div>
                    )}
                </div>
            </div>
            <div className="App-header">
                <div className="available-container">
                    <h2 className="title">Slots Available (45+)</h2>
                    {availableSlots45.length === 0 ? (
                        <div className="loader">No slots available</div>
                    ) : (
                        <div>{availableSlots45.map(renderList)}</div>
                    )}
                </div>
                <div className="all-centers-container">
                    <h2 className="title">Centers (45+)</h2>
                    {loading ? (
                        <div className="loader">Fetching data...</div>
                    ) : slotsList45.length === 0 ? (
                        <div className="loader">No Centers available</div>
                    ) : (
                        <div>{slotsList45.map(renderList)}</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SlotsAvailableAlert;
