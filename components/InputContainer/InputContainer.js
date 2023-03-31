import React, { useState } from "react";
import "./InputContainer.scss";

import IndianData from "../../utils/india.json";
import Select from "react-select";
import Link from "next/link";

function InputContainer({ data, setData }) {
  const [flightData] = useState(IndianData);
  const [date] = useState(new Date());

  return (
    <div className="InputContainer">
      <h2>Build Itinerary</h2>
      <hr />
      <div className="InputContainer__inputs">
        <Select
          className="InputContainer__inputs--select"
          styles={{
            control: (base, _) => ({
              ...base,
              background: "#35383F",
              borderColor: "#555555",

              "&:hover": {
                borderColor: "#636363",
              },
            }),
            option: (base, _) => ({
              ...base,
              background: "#35383F",
              color: "#fff",
              "&:hover": {
                background: "#555555",
              },
            }),
            menu: (base, _) => ({
              ...base,
              background: "#35383F",
              color: "#fff",
            }),
            container: (provided) => ({
              ...provided,
              minWidth: "250px",
              color: "#fff",
            }),
            menuList: (base, _) => ({
              ...base,
              borderRadius: "5px",

              "::-webkit-scrollbar-track": {
                background: "#35383F",
              },
            }),
            input: (base, _) => ({
              ...base,
              color: "#fff",
            }),
            singleValue: (base, _) => ({
              ...base,
              color: "#fff",
            }),
          }}
          placeholder="From"
          options={flightData
            .sort((a, b) => a.city.localeCompare(b.city))
            .map((item) => ({
              value: item.city,
              label: `${item.city}-${item.iata}`,
              ...item,
            }))}
          onChange={(item) => {
            setData({ ...data, source: `${item.iata}`, fromCity: item.city });
          }}
          defaultValue={{
            value: data.fromCity,
            label: `${data.fromCity}-${data.source}`,
          }}
        />
        <Select
          className="InputContainer__inputs--select"
          styles={{
            control: (base, _) => ({
              ...base,
              background: "#35383F",
              borderColor: "#555555",

              "&:hover": {
                borderColor: "#636363",
              },
            }),
            option: (base, _) => ({
              ...base,
              background: "#35383F",
              color: "#fff",
              "&:hover": {
                background: "#555555",
              },
            }),
            menu: (base, _) => ({
              ...base,
              background: "#35383F",
              color: "#fff",
            }),
            container: (provided) => ({
              ...provided,
              minWidth: "250px",
              color: "#fff",
            }),
            menuList: (base, _) => ({
              ...base,
              borderRadius: "5px",

              "::-webkit-scrollbar-track": {
                background: "#35383F",
              },
            }),
            input: (base, _) => ({
              ...base,
              color: "#fff",
            }),
            singleValue: (base, _) => ({
              ...base,
              color: "#fff",
            }),
          }}
          placeholder="To"
          options={flightData
            // sort by city name
            .sort((a, b) => a.city.localeCompare(b.city))
            .map((item) => ({
              value: item.city,
              label: `${item.city}-${item.iata}`,
              ...item,
            }))}
          onChange={(item) => {
            setData({
              ...data,
              destination: `${item.iata}`,
              toCity: item.city,
            });
          }}
          defaultValue={{
            value: data.toCity,
            label: `${data.toCity}-${data.destination}`,
          }}
        />
        <input
          type="date"
          placeholder="Date"
          value={data.end_date}
          onChange={(e) => setData({ ...data, end_date: e.target.value })}
          min={date.toISOString().split("T")[0]}
        />
        <input
          type="number"
          placeholder="Days"
          id="days"
          value={data.noOfDays}
          onChange={(e) => setData({ ...data, noOfDays: e.target.value })}
        />
        <Link
          href={`/query/${data.toCity}-${data.destination}/${data.fromCity}-${data.source}/${data.end_date}/${data.noOfDays}`}
          className="InputContainer__inputs--button"
        >
          Build!
        </Link>
      </div>
    </div>
  );
}

export default InputContainer;
