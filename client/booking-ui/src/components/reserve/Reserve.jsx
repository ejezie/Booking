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

function Reserve({ setOpen, hotelId }) {
  const [roomData, setRommData] = React.useState([]);
  const handleSelect = () => {
    return {};
  };

  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);

  useEffect(() => {
    const dat = axios
      .get(`http://localhost:8800/api/rooms/${data[0]}`)
      .then((response) => setRommData(response.data));
  }, [data]);

  // useEffect(() => {
  //   Promise.all(
  //     data.map((item) => {
  //         const dat = axios.get(`http://localhost:8800/api/rooms/${item}`);
  //         console.log(dat, "Promise")
  //     })
  //   ).then((data) => setRommData(data)).catch((err) => console.log(err))
  //   console.log("1")
  // }, [setOpen]);
  // const roomData = async () => {
  //   return await promiseData?.then((data) => { return JSON.parse(data, null, 2)});
  // };

  console.log(roomData, "roomData");

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
          <div>No rooms available at the moment</div>
        ) : (
          <span>Select your rooms:</span>
        )}

        {roomData &&
          <div className="rItem" key={roomData._id}>
            <div className="rroomDataInfo">
              <div className="rTitle">{roomData.title}</div>
              <div className="rDesc">{roomData.desc}</div>
              <div className="rMax">
                Max people: <b>{roomData.maxPeople}</b>
              </div>
              <div className="rPrice">{roomData.price}</div>
            </div>
            <div className="rSelectRooms">
              {/* {roomData.roomNumbers.map((roomNumber) => (
                <div className="room">
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))} */}
            </div>
          </div>
        }
        {roomData > 1 && (
          <button onClick={handleClick} className="rButton">
            Reserve Now!
          </button>
        )}
      </div>
    </div>
  );
}

export default Reserve;
