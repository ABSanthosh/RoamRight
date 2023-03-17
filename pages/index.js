import { useState } from "react";
import "../styles/routes/Home.scss";
import IndianData from "../utils/india.json";
import Select from "react-select";

export default function Home() {
  const [itinerary, setItinerary] = useState("");
  const [flights, setFlights] = useState();
  const [flightData, setFlightData] = useState(IndianData);

  const [data, setData] = useState({
    fromCity: "",
    toCity: "",
    date: "",
    noOfDays: "",
  });

  return (
    <main className="HomeContainer">
      <form>
        {/* <input
          type="text"
          placeholder="City"
          value={data.city}
          onChange={(e) => setData({ ...data, city: e.target.value })}
        /> */}
        <Select
          styles={{
            container: (provided) => ({
              ...provided,
              width: "100%",
            }),
          }}
          placeholder="From"
          options={flightData.map((item) => ({
            value: item.city,
            label: `${item.city}-${item.iata}`,
            ...item,
          }))}
          onChange={(item) => {
            setData({ ...data, fromCity: `${item.iata}-${item.city}` });
            // setFlightData(flightData.filter((item2) => item2.id !== item.id));
          }}
        />
        <Select
          styles={{
            container: (provided) => ({
              ...provided,
              width: "100%",
            }),
          }}
          placeholder="To"
          options={flightData
            .filter((item) => item.id !== data.id)
            .map((item) => ({
              value: item.city,
              label: `${item.city}-${item.iata}`,
              ...item,
            }))}
          onChange={(item) => {
            setData({ ...data, toCity: `${item.iata}-${item.city}` });
            // setFlightData(flightData.filter((item2) => item2.id !== item.id));
          }}
        />
        <input
          type="date"
          placeholder="Date"
          value={data.date}
          onChange={(e) => setData({ ...data, date: e.target.value })}
        />
        <input
          type="text"
          placeholder="No. of Days"
          value={data.noOfDays}
          onChange={(e) => setData({ ...data, noOfDays: e.target.value })}
        />
        <button
          type="submit"
          onClick={async (e) => {
            e.preventDefault();

            console.log(data);

            return;
            const response = await fetch("/api/get-itinerary", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            });
            const text = await response.json().then((res) => res.text);
            setItinerary(text);

            const flightsResponse = await fetch("/api/get-flights", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({}),
            });
          }}
        >
          Get Itinerary
        </button>
      </form>
      <div className="ItineraryContainer">
        <p>{itinerary}</p>
      </div>

      <div className="FlightsContainer">
        <pre>{JSON.stringify(flights, null, 2)}</pre>
      </div>
    </main>
  );
}

// even though the signal strength is high, since many people are using the same network band, the speed is slow
// if frequency is high, then it may not be able to pass through obstacles
// shannon capacity is divided between all users using the same band

// if Pt is 20db with a distance of 5 meters, then the signal strength is -1db
// its very hard to build hardware that can transmit and receive at the same time

// We use CSMA/CA along with retransmission to avoid collisions
