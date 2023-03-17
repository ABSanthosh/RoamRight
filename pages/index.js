import { useState } from "react";
import "../styles/routes/Home.scss";
import IndianData from "../utils/india.json";
import Select from "react-select";
import Cashify from "../utils/Cashify";

export default function Home() {
  const [itinerary, setItinerary] = useState("");
  const [flights, setFlights] = useState();
  const [flightData] = useState(IndianData);

  const [data, setData] = useState({
    source: "",
    destination: "",
    end_date: "",
    noOfDays: "",
    adults: 1,
    children: 0,
    infants: 0,
    classType: "E",
  });

  return (
    <main className="HomeContainer">
      <form>
        <Select
          styles={{
            container: (provided) => ({
              ...provided,
              width: "100%",
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
            setData({ ...data, source: `${item.iata}` });
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
            // sort by city name
            .sort((a, b) => a.city.localeCompare(b.city))
            .map((item) => ({
              value: item.city,
              label: `${item.city}-${item.iata}`,
              ...item,
            }))}
          onChange={(item) => {
            setData({ ...data, destination: `${item.iata}` });
          }}
        />
        <input
          type="date"
          placeholder="Date"
          value={data.date}
          onChange={(e) => setData({ ...data, end_date: e.target.value })}
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

            // const response = await fetch("/api/get-itinerary", {
            //   method: "POST",
            //   headers: {
            //     "Content-Type": "application/json",
            //   },
            //   body: JSON.stringify(data),
            // });
            // const text = await response.json().then((res) => res.text);
            // setItinerary(text);

            await fetch("/api/get-flights", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            }).then((res) => res.json().then((res) => setFlights(res.data)));
          }}
        >
          Get Itinerary
        </button>
      </form>
      <div className="ItineraryContainer">
        <p>{itinerary}</p>
      </div>

      <div className="FlightsContainer">
        <pre>
          {JSON.stringify(
            flights?.flights.map((item) => {
              return {
                airline: item.airline,
                departureTime: item.departureTimeAirport,
                departureDate: item.departureDateAirport,
                arrivalTime: item.arrivalTimeAirport,
                arrivalDate: item.arrivalDateAirport,
                duration: item.duration,
                hops:
                  item.hops.length === 1
                    ? "Non Stop"
                    : `${item.hops.length} Stop(s)`,
                price: Cashify(item.price[0].display_price),
                seats: item.price[0].seats_available,
              };
            }),

            null,
            2
          )}
        </pre>
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
