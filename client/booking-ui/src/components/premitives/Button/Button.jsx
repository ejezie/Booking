import React from "react";
import { TailSpin } from "react-loader-spinner";
import "./button.css";

function Button({ loading, title, className = "lButton" }) {
  return (
    <button
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {loading ? (
        <TailSpin
          height="20"
          width="20"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      ) : (
        title
      )}
    </button>
  );
}

export default Button;
