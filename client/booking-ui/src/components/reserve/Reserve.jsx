import React from "react";
import "./reserve.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import { useCallback } from "react";

function Reserve({ setOpen, hotelId }) {
  const [roomData, setRommData] = React.useState([]);
  const [selectedRooms, setSelectedRooms] = React.useState([]);
  const [roomLoading, setRoomLoading] = React.useState(true);

  const handleSelect = (e) => {
    const selected = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      selected
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
  const {date} = useContext(SearchContext)

  const getAllRomms = () => {
    data.map((item) => {
      axios.get(`http://localhost:8800/api/rooms/${item}`).then((response) => {
        setRommData([...roomData, response.data])
        setRoomLoading(false);
      });
    });
  };

  const getDatesInRange = (start, end) => {
    const date = new Date(start).getTime();
    let dateList = []
    while(date < end){
      dateList.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return dateList;
  }

  useEffect(() => {
    getAllRomms();
  }, [data]);

  console.log(selectedRooms, "roomData");

  const handleClick = () => {
    return {};
  };

  const isAvailable = false;
  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        {roomData.length < 1 ? (
          roomLoading && (
            <TailSpin
              height="30"
              width="30"
              color="#4fa94d"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          )
        ) : (
          <>
            <span>Select your rooms:</span>
            {roomData &&
              roomData?.map((item) => (
                <>
                  <div className="rItem" key={item._id}>
                    <div className="rroomDataInfo">
                      <div className="rTitle">{item.title}</div>
                      <div className="rDesc">{item.desc}</div>
                      <div className="rMax">
                        Max people: <b>{item.maxPeople}</b>
                      </div>
                      <div className="rPrice">{item.price}</div>
                    </div>
                    <div className="rSelectRooms">
                      {item?.roomNumbers?.map((roomNumber, i) => (
                        <div className="room">
                          <label>{i + 1}</label>
                          <input
                            type="checkbox"
                            value={roomNumber._id}
                            onChange={handleSelect}
                            // disabled={!isAvailable(roomNumber)}
                          />
                        </div>
                      ))}
                    </div>
                    <button onClick={handleClick} className="rButton">
                      Reserve Now!
                    </button>
                  </div>
                </>
              ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Reserve;
