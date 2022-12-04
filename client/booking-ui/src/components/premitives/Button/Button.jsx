import React from "react";
import { TailSpin } from "react-loader-spinner";
import "./button.css"

function Button({ loading, title, className="lButton" }) {
  return (
    <button className={className}>
      {loading ? (
        <TailSpin
          height="80"
          width="80"
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
