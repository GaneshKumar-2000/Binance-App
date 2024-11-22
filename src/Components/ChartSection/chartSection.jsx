import React, { useMemo, useCallback } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setTicker, setTime } from '../../redux/chartStore/chartStore';


const ChartSection = ({ chartData, tickerList }) => {

    const { ticker, time } = useSelector(state => state.chart);
    const dispatch = useDispatch();

    //this is to convert the binance data to required candlestick chart data format
    const candleStickData = chartData.map((candle) => ({
        x: new Date(candle[0]),
        y: [parseFloat(candle[1]), parseFloat(candle[2]), parseFloat(candle[3]), parseFloat(candle[4])]
    }));

    const series = useMemo(() => [{ data: candleStickData }], [candleStickData]);

    const options = {
        chart: {
            type: 'candlestick',
        },
        title: {
            text: `Candlestick Chart for ${ticker}`,
            align: 'left',
        },
        xaxis: {
            type: 'datetime',
        },
    };

    const tickerChange = useCallback((e) => {
        const tickerValue = e.target.value;
        dispatch(setTicker(tickerValue));
    }, [dispatch]);

    const timeChange = useCallback((e) => {
        const timeValue = e.target.value;
        dispatch(setTime(timeValue));
    }, [dispatch]);

    const timeframes = ["1s", "1m", "3m", "5m", "15m", "30m", "1h", "2h", "4h", "6h", "8h", "12h", "1d", "3d", "1w", "1M"]

    return (
        <div className='chart-view'>
            <div className='options-view'>
                <div className='title'>
                    Options
                </div>
                <div className='options'>
                    <Row>
                        <Col sm={6}>
                            <label>Ticker :&nbsp;&nbsp;&nbsp;</label>
                            <select value={ticker} onChange={tickerChange}>
                                {tickerList?.map((d) => (
                                    <option key={d} value={d}>
                                        {d}
                                    </option>
                                ))}
                            </select>
                        </Col>
                        <Col sm={6}>
                            <label>Timeframe :&nbsp;&nbsp;&nbsp;</label>
                            <select value={time} onChange={timeChange}>
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
            <ReactApexChart options={options} series={series} type="candlestick" height={400} />
        </div>
    );

}

export default ChartSection