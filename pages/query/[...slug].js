import { useState } from "react";
import Header from "../../components/Header/Header";
import "../../styles/routes/query/slug.scss";
import InputContainer from "../../components/InputContainer/InputContainer";

export async function getServerSideProps(context) {
  const { slug } = context.params;
  const [dCity, sCity, date, days] = slug;

  return {
    props: {},
  };
}

export default function Slug({ dCity, sCity, date, days }) {
  // /query/Jaipur-JAI/Delhi-DEL/2023-03-28/5
  // /query/dCity-iata/sCity-iata/yyyy-mm-dd/days

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
    <main className="SlugContainer">
      <Header />
      <div className="SlugContainer__main">
        <InputContainer data={data} setData={setData} />
      </div>
    </main>
  );
}
