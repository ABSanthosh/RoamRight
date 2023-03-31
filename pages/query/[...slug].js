import { useState } from "react";
import Header from "../../components/Header/Header";
import "../../styles/routes/query/slug.scss";
import InputContainer from "../../components/InputContainer/InputContainer";
import ContentContainer from "../../components/ContentContainer/ContentContainer";

export async function getServerSideProps(context) {
  const { slug } = context.params;
  const [dCity, sCity, date, days] = slug;

  return {
    props: {
      dCity,
      sCity,
      date,
      days,
    },
  };
}

export default function Slug({ dCity, sCity, date, days }) {
  // /query/Jaipur-JAI/Delhi-DEL/2023-03-28/5
  // /query/dCity-iata/sCity-iata/yyyy-mm-dd/days

  const [flightData, setFlightData] = useState([]);

  const [data, setData] = useState({
    source: sCity.split("-")[1],
    fromCity: sCity.split("-")[0],
    destination: dCity.split("-")[1],
    toCity: dCity.split("-")[0],
    end_date: date,
    noOfDays: days,
    adults: 1,
    children: 0,
    infants: 0,
    classType: "E",
  });

  return (
    <main className="SlugContainer">
      <Header />
      <div className="SlugContainer__main">
        <InputContainer data={data} setData={setData} />
        <ContentContainer
          data={data}
          flightData={flightData}
          setFlightData={setFlightData}
        />
      </div>
    </main>
  );
}
