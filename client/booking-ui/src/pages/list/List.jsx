import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";

const List = () => {
  const location = useLocation();
  const [city, setCity] = useState(location.state.city);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const { loading, data, error, reFetch } = useFetch(
    `/hotels?city=${city}&min=${min || 0}&max=${max || 200000}`
  );

  const [dispatch] = useContext(SearchContext)
  const handleClick = () => {
    reFetch();
    dispatch({type: "NEW_SEARCH", payload: {city, dates, options}})
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        <div style={{width: '100%', height: '60vh', background: 'red'}}>loading...</div>
      ) : (
        <div className="listContainer">
          <div className="listWrapper">
            <div className="listSearch">
              <h1 className="lsTitle">Search</h1>
              <div className="lsItem">
                <label>Destination</label>
                <input
                  onChange={(e) => setCity(e.target.value)}
                  placeholder={city}
                  type="text"
                />
              </div>
              <div className="lsItem">
                <label>Check-in Date</label>
                <span onClick={() => setOpenDate(!openDate)}>{`${format(
                  dates[0].startDate,
                  "MM/dd/yyyy"
                )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
                {openDate && (
                  <DateRange
                    onChange={(item) => setDates([item.selection])}
                    minDate={new Date()}
                    ranges={dates}
                  />
                )}
              </div>
              <div className="lsItem">
                <label>Options</label>
                <div className="lsOptions">
                  <div className="lsOptionItem">
                    <span className="lsOptionText">
                      Min price <small>per night</small>
                    </span>
                    <input
                      onChange={(e) => setMin(e.target.value)}
                      type="number"
                      className="lsOptionInput"
                    />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">
                      Max price <small>per night</small>
                    </span>
                    <input
                      onChange={(e) => setMax(e.target.value)}
                      type="number"
                      className="lsOptionInput"
                    />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Adult</span>
                    <input
                      type="number"
                      min={1}
                      className="lsOptionInput"
                      placeholder={options.adult}
                    />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Children</span>
                    <input
                      type="number"
                      min={0}
                      className="lsOptionInput"
                      placeholder={options.children}
                    />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Room</span>
                    <input
                      type="number"
                      min={1}
                      className="lsOptionInput"
                      placeholder={options.room}
                    />
                  </div>
                </div>
              </div>
              <button onClick={handleClick}>Search</button>
            </div>
            <div className="listResult">
              {loading ? (
                <div>Loading...</div>
              ) : (
                data?.map((item, i) => (
                  <SearchItem key={item?._id} item={item} />
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
