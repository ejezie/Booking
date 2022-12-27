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
  const [selectedRooms, setSelectedRooms] = React.useState([]);


  const handleSelect = (e) => {
    const selected  = e.target.checked
    const value = e.target.value
    setSelectedRooms(
      selected ? [...selectedRooms, value] : selectedRooms.filter(item => item !== value)
    )
  };

  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);

  const getAllRomms = () => {
    data.map((item) => {
      axios
        .get(`http://localhost:8800/api/rooms/${item}`)
        .then((response) => setRommData((prev) => [...prev, response.data]));
    });
  };

  useEffect(() => {
    getAllRomms();
  }, [data]);

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
          roomData.map((item) => {
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
                {roomData?.roomNumbers?.map((roomNumber) => (
                  <div className="room">
                    <label>{roomNumber.number}</label>
                    <input
                      type="checkbox"
                      value={roomNumber._id}
                      onChange={handleSelect}
                      disabled={!isAvailable(roomNumber)}
                    />
                  </div>
                ))}
              </div>
            </div>;
          })}
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
