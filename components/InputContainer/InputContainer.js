import React, { useState } from "react";
import "./InputContainer.scss";

import IndianData from "../../utils/india.json";
import Select from "react-select";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from '@radix-ui/react-icons';


function InputContainer({ data, setData }) {
  const [flightData] = useState(IndianData);
  const [date, setDate] = useState(new Date());

  return (
    <div className="InputContainer">
      <Accordion.Root
        className="AccordionRoot "
        type="single"
        defaultValue="item-1"
        collapsible
      >
        <Accordion.Item className="AccordionItem" value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </Accordion.Item>
      </Accordion.Root>
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
        />
        <input
          type="date"
          placeholder="Date"
          value={data.date}
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
        <button className="InputContainer__inputs--button">Build!</button>
      </div>
    </div>
  );
}

const AccordionTrigger = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Header className="AccordionHeader">
      <Accordion.Trigger
        className={"AccordionTrigger"}
        {...props}
        ref={forwardedRef}
      >
        {children}
        <ChevronDownIcon className="AccordionChevron" aria-hidden />
      </Accordion.Trigger>
    </Accordion.Header>
  )
);

const AccordionContent = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Content
      className={"AccordionContent"}
      {...props}
      ref={forwardedRef}
    >
      <div className="AccordionContentText">{children}</div>
    </Accordion.Content>
  )
);

export default InputContainer;
