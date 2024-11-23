import React, { useState, useEffect, useRef, useCallback } from 'react'
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/authStore/authStore';
import ChartSection from '../../Components/ChartSection/chartSection';
import TableSection from '../../Components/TableSection/tableSection';
import { GetAPI } from '../../Api/api';
import { setTicker, setTime } from '../../redux/chartStore/chartStore';
import { setEndDate, setStartDate, setTableTicker, setTableTime } from '../../redux/tableStore/tableStore';

const Dashboard = () => {

    const [chartData, setChartData] = useState([]);
    const [tableData, settableData] = useState([]);
    const [tickerList, setTickerList] = useState();
    const dispatch = useDispatch();

    const { ticker, time } = useSelector(state => state.chart);
    const { tableTicker, tableTime, startDate, endDate, limit } = useSelector(state => state.table);

    const logoutUser = () => {
        const response = confirm("Do you really want to Logout ?");
        if (response) {
            dispatch(logout())
            dispatch(setTicker("BTCUSDT"))
            dispatch(setTime("1m"))
            dispatch(setTableTicker("BTCUSDT"))
            dispatch(setTableTime("1m"))
            dispatch(setStartDate(new Date().getTime() - 86400000));
            dispatch(setEndDate(new Date().getTime()));
        }
    }

    useEffect(() => {
        fetchTickers();
    }, [])

    //This useeffect is for chart data
    useEffect(() => {
        fetchBinanceAPIChart();

        const liveDataFetch = setInterval(fetchBinanceAPIChart, 10000);

        return () => clearInterval(liveDataFetch)
    }, [ticker, time])

    //this useeffect is for table data
    useEffect(() => {
        fetchBinanceAPITable();

        const liveDataFetch = setInterval(fetchBinanceAPITable, 10000);

        return () => clearInterval(liveDataFetch)
    }, [tableTicker, tableTime])

    const fetchBinanceAPIChart = () => {
        const url = `https://api1.binance.com/api/v1/klines?symbol=${ticker}&interval=${time}`;
        GetAPI(url, (response) => {
            setChartData(response)
        })
    }

    const fetchBinanceAPITable = () => {
        const url = `https://api1.binance.com/api/v1/klines?symbol=${tableTicker}&interval=${tableTime}&limit=${limit == 0 ? '50' : limit}&startTime=${startDate}&endTime=${endDate}`;
        GetAPI(url, (response) => {
            settableData(response)
        })
    }

    const fetchTickers = () => {
        const url = `https://api1.binance.com/api/v3/exchangeInfo`;
        GetAPI(url, (response) => {
            const Symbols = response.symbols
                .filter((d) => d.status === "TRADING")
                .map((tick) => tick.symbol)
                .sort((a, b) => a.localeCompare(b))
            setTickerList(Symbols);
        })
    }

    const activeTab = localStorage.getItem("tab");

    const updateTab = (key) => {
        localStorage.setItem("tab", key)
    }

    return (
        <div className='dashboard'>
            <div>
                <Tab.Container defaultActiveKey={activeTab} onSelect={updateTab}>
                    <Row>
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="chart">Chart View</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="table">Table View</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <button type="button" className="btn" id='logout-button' onClick={logoutUser}>Logout</button>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="chart"><ChartSection chartData={chartData} tickerList={tickerList} /></Tab.Pane>
                                <Tab.Pane eventKey="table"><TableSection tableData={tableData} tickerList={tickerList} applyFilter={fetchBinanceAPITable} /></Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        </div>
    )
}

export default Dashboard