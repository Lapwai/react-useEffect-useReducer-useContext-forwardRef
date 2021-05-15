import React, { useEffect, useState } from "react";

function MyComponent(props) {
  const [dataState, setDataState] = useState(null);
  useEffect(() => {
    const fetchData = fetch("https://foaas.com/operations/", {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setDataState(data);
      });
  }, []);
  return (
    <div>
      {dataState &&
        dataState.map((item, index) => {
          return <p key={index}>{item.url}</p>;
        })}
      <h3>123</h3>
    </div>
  );
}

export default MyComponent;
