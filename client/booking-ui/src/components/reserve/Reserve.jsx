import React from "react";
import "./reserve.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Reserve({ setOpen, hotelId }) {
  const handleSelect = () => {
    return {};
  };

  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);

  const promiseData = Promise.all(
    data.map((item) => {
      try {
        const dat = axios
          .get(`http://localhost:8800/api/rooms/${item}`)
          .then((data) => {
            return JSON.stringify(data, null, 2);
          });
        return dat;
      } catch (err) {
        console.log(err);
        throw err;
      }
    })
  );

  promiseData?.then((data) =>
    console.log(JSON.parse(data, null, 2), "ROOMDATA")
  );
  const roomData = async () => {
    return await promiseData?.then((data) => { return JSON.parse(data, null, 2)});
  };
  console.log(roomData(), "roomDta");

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

        {/* {roomData?.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">{item.price}</div>
            </div>
            <div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber) => (
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
          </div>
        ))} */}
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
