import React, { useCallback, useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setTableTicker, setTableTime, setStartDate, setEndDate, setLimit, setSorted } from '../../redux/tableStore/tableStore';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TableSection = ({ tableData, tickerList, applyFilter }) => {

  const [filterShow, setFilterShow] = useState(false);
  const [sortShow, setSortShow] = useState(false);
  const [isSorted, setIsSorted] = useState(false);

  //datepicker States 
  const start = new Date(Number(localStorage.getItem("startDate")));
  const end = localStorage.getItem("endDate") ? new Date(Number(localStorage.getItem("endDate"))) : new Date();

  const [startDateTemp, setStartDateTemp] = useState(start);
  const [endDateTemp, setEndDateTemp] = useState(end);

  //This is to map only the values that are needed for table data
  const tableList = tableData.map((value) => ({
    time: new Date(value[0]),
    open: parseFloat(value[1]),
    high: parseFloat(value[2]),
    low: parseFloat(value[3]),
    close: parseFloat(value[4]),
    volume: parseFloat(value[5])
  }));

  //Table variables
  const itemsPerPage = 5;

  const columns = [
    { name: 'Open', selector: row => row.open, sortable: true },
    { name: 'High', selector: row => row.high, sortable: true },
    { name: 'Low', selector: row => row.low, sortable: true },
    { name: 'Close', selector: row => row.close, sortable: true },
    { name: 'Volume', selector: row => row.volume, sortable: true },
  ];

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: '#f4f4f4',
        color: '#333',
        fontWeight: 'bold',
        textAlign: 'center',
      },
    },
    rows: {
      style: {
        '&:hover': {
          backgroundColor: '#f1f1f1',
        },
      },
    },
  };

  //Options variables and functions to change state
  const { tableTicker, tableTime, limit } = useSelector(state => state.table);
  const dispatch = useDispatch();

  const tickerChange = useCallback((e) => {
    const tickerValue = e.target.value;
    dispatch(setTableTicker(tickerValue));
  }, [dispatch]);

  const timeChange = useCallback((e) => {
    const timeValue = e.target.value;
    dispatch(setTableTime(timeValue));
  }, [dispatch]);

  const timeframes = ["1s", "1m", "3m", "5m", "15m", "30m", "1h", "2h", "4h", "6h", "8h", "12h", "1d", "3d", "1w", "1M"];

  const apply = () => {
    dispatch(setStartDate(startDateTemp.getTime()));
    dispatch(setEndDate(endDateTemp.getTime()));
    applyFilter();
    setFilterShow((status) => !status)
  }

  const updateLimit = useCallback((e) => {
    dispatch(setLimit(e.target.value))
  })

  const sortedData = isSorted ? [...tableList].sort((a, b) => a.time - b.time) : [...tableList].sort((a, b) => b.time - a.time);

  const updateSort = () => {
    dispatch(setSorted(isSorted))
  }

  useEffect(() => {
    const storedStartDate = localStorage.getItem("startDate");
    const storedEndDate = localStorage.getItem("endDate");

    if (storedStartDate) {
      setStartDateTemp(new Date(Number(storedStartDate)));
    }

    if (storedEndDate) {
      setEndDateTemp(new Date(Number(storedEndDate)));
    }
  }, []);


  return (
    <div className='table-view'>
      <div className='table-navbar'>
        <div className='options-view'>
          <div className='title'>
            Options
          </div>
          <div className='options'>
            <Row>
              <Col sm={4}>
                <label>Ticker :&nbsp;&nbsp;&nbsp;</label>
                <select value={tableTicker} onChange={tickerChange}>
                  {tickerList?.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </Col>
              <Col sm={3}>
                <label>Timeframe :&nbsp;&nbsp;&nbsp;</label>
                <select value={tableTime} onChange={timeChange}>
                  {timeframes?.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </Col>
              <Col sm={2}>
                <div onClick={() => setFilterShow((status) => !status)} className='filter'><span>Filter</span></div>
              </Col>
              <Col sm={2}>
                <div onClick={() => setSortShow((status) => !status)} className='sort'><span>Sort</span></div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <div className='table-data'>
        <div className='sort-status'><b>Sorted order - </b>{isSorted ? 'oldest to newest' : 'newest to oldest'}</div>
        <DataTable
          title={`OHLCV for ${tableTicker}`}
          columns={columns}
          data={sortedData || []}
          customStyles={customStyles}
          pagination
          paginationPerPage={itemsPerPage}
          paginationRowsPerPageOptions={[5, 10, 20]}
        />
      </div>

      {/* Filter pop-up */}
      <Modal
        show={filterShow}
        onHide={() => setFilterShow((status) => !status)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Filters
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='time-filter'>
            <label><strong>Start date :</strong> &nbsp;</label>
            <DatePicker
              selected={startDateTemp}
              onChange={(date) => setStartDateTemp(date)}
              timeInputLabel="Time:"
              dateFormat="MM/dd/yyyy h:mm aa"
              showTimeInput
            />
            <label><strong>End date :</strong> &nbsp;</label>
            <DatePicker
              selected={endDateTemp}
              onChange={(date) => setEndDateTemp(date)}
              timeInputLabel="Time:"
              dateFormat="MM/dd/yyyy h:mm aa"
              showTimeInput
            />
          </div>
          <div className='limit'>
            <label><strong>Limit : </strong>&nbsp;</label>
            <input type='number' onChange={updateLimit} value={limit} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={apply}>Apply</Button>
          <Button onClick={() => setFilterShow((status) => !status)}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* sorting pop-up */}
      <Modal
        show={sortShow}
        onHide={() => setSortShow((status) => !status)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Sort
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='sort-options' onClick={() => { setIsSorted((status) => !status); setSortShow((status) => !status); updateSort }}>{isSorted ? "Sort Descending" : "Sort Ascending"}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setSortShow((status) => !status)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default TableSection