import { useState } from "react";
import "../styles/routes/Home.scss";
import IndianData from "../utils/india.json";
import Select from "react-select";
import Cashify from "../utils/Cashify";
import Header from "../components/Header/Header";
import InputContainer from "../components/InputContainer/InputContainer";

export default function Home() {
  const [itinerary, setItinerary] = useState("");
  const [flights, setFlights] = useState();
  const [flightData] = useState(IndianData);

  const [data, setData] = useState({
    source: "",
    fromCity: "",
    destination: "",
    toCity: "",
    end_date: "",
    noOfDays: "",
    adults: 1,
    children: 0,
    infants: 0,
    classType: "E",
  });

  return (
    <main className="HomeContainer">
      <Header />
      <div className="HomeContainer__main">
        <InputContainer data={data} setData={setData} />
        <button
          type="submit"
          onClick={async (e) => {
            e.preventDefault();

            // const response = await fetch("/api/get-itinerary", {
            //   method: "POST",
            //   headers: {
            //     "Content-Type": "application/json",
            //   },
            //   body: JSON.stringify({
            //     city: data.toCity,
            //     date: data.end_date,
            //     noOfDays: data.noOfDays,
            //   }),
            // });
            // const text = await response.json().then((res) => res.text);
            // setItinerary(text);

            await fetch("/api/get-flights", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            }).then((res) =>
              res.json().then((res) => {
                console.log(res);
                setFlights(res.data);
              })
            );
          }}
        >
          Get Itinerary
        </button>
      </div>
      {/* <form>
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
            setData({ ...data, source: `${item.iata}`, fromCity: item.city });
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
            setData({
              ...data,
              destination: `${item.iata}`,
              toCity: item.city,
            });
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
        <a
          href={`/query/${data.toCity}-${data.destination}/${data.fromCity}-${data.source}/${data.end_date}/${data.noOfDays}`}
        >
          Fetch!
        </a>
        <button
          type="submit"
          onClick={async (e) => {
            e.preventDefault();

            // const response = await fetch("/api/get-itinerary", {
            //   method: "POST",
            //   headers: {
            //     "Content-Type": "application/json",
            //   },
            //   body: JSON.stringify({
            //     city: data.toCity,
            //     date: data.end_date,
            //     noOfDays: data.noOfDays,
            //   }),
            // });
            // const text = await response.json().then((res) => res.text);
            // setItinerary(text);

            // await fetch("/api/get-flights", {
            //   method: "POST",
            //   headers: {
            //     "Content-Type": "application/json",
            //   },
            //   body: JSON.stringify(data),
            // }).then((res) =>
            //   res.json().then((res) => {
            //     console.log(res);
            //     setFlights(res.data);
            //   })
            // );
          }}
        >
          Get Itinerary
        </button>
      </form>
      */}
    </main>
  );
}
