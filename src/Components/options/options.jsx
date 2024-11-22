import React, { useCallback } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setTicker, setTime } from '../../redux/chartStore/chartStore';
import { setTableTicker, setTableTime } from '../../redux/tableStore/tableStore';

const Options = ({ tickerList, activeTab }) => {

    const { ticker, time } = useSelector(state => state.chart);
    const { tableTicker, tableTime } = useSelector(state => state.table);
    const dispatch = useDispatch();

    const tickerChange = useCallback((e) => {
        const tickerValue = e.target.value;
        if (activeTab === "chart") {
            dispatch(setTicker(tickerValue));
        } else if (activeTab === "table") {
            dispatch(setTableTicker(tickerValue));
        }
    }, [dispatch, activeTab]);

    const timeChange = useCallback((e) => {
        const timeValue = e.target.value;
        if (activeTab === "chart") {
            dispatch(setTime(timeValue));
        } else if (activeTab === "table") {
            dispatch(setTableTime(timeValue));
        }
    }, [dispatch, activeTab]);

    const timeframes = ["1s", "1m", "3m", "5m", "15m", "30m", "1h", "2h", "4h", "6h", "8h", "12h", "1d", "3d", "1w", "1M"]


    return (
        <div className='options-view'>
            <div className='title'>
                Options
            </div>
            <div className='options'>
                <Row>
                    <Col sm={6}>
                        <label>Ticker :&nbsp;&nbsp;&nbsp;</label>
                        <select value={activeTab === "chart" ? ticker : activeTab === "table" ? tableTicker : ticker} onChange={tickerChange}>
                            {tickerList?.map((d) => (
                                <option key={d} value={d}>
                                    {d}
                                </option>
                            ))}
                        </select>
                    </Col>
                    <Col sm={6}>
                        <label>Timeframe :&nbsp;&nbsp;&nbsp;</label>
                        <select value={activeTab === "chart" ? time : activeTab === "table" ? tableTime : time} onChange={timeChange}>
                            {timeframes?.map((d) => (
                                <option key={d} value={d}>
                                    {d}
                                </option>
                            ))}
                        </select>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Options