import React from "react";
import "./ContentContainer.scss";
import * as Tabs from "@radix-ui/react-tabs";
import Fetcher from "../../utils/Fetcher";
import BlurredSpinner from "../BlurredSpinner/BlurredSpinner";
import Cashify from "../../utils/Cashify";

function ContentContainer({ data, flightData, setFlightData }) {
  return (
    <div className="ContentContainer">
      <Tabs.Root className="TabsRoot" defaultValue="tab1">
        <Tabs.List className="TabsList">
          <Tabs.Trigger className="TabsTrigger" value="tab1">
            Itinerary
          </Tabs.Trigger>
          <Tabs.Trigger
            className="TabsTrigger"
            value="tab2"
            onClick={async () => {
              if (flightData.length === 0) {
                await Fetcher("/api/get-flights", {
                  method: "POST",
                  body: data,
                }).then((res) => {
                  setFlightData(res.data);
                  console.log(res.data);
                });
              }
            }}
          >
            Flights
          </Tabs.Trigger>
          <Tabs.Trigger className="TabsTrigger" value="tab3">
            Bus
          </Tabs.Trigger>
          <Tabs.Trigger className="TabsTrigger" value="tab4">
            Trains
          </Tabs.Trigger>
          <div className="TabsTrigger" data-state="inactive" />
        </Tabs.List>
        <Tabs.Content className="TabsContent" value="tab1">
          <p>Itinerary</p>
        </Tabs.Content>
        <Tabs.Content
          className="TabsContent"
          value="tab2"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            minHeight : "430px"

          }}
        >
          <p>Flights</p>
          {flightData.length === 0 ? (
            <BlurredSpinner
              style={{
                borderRadius: "0 0 9px 9px",
                minHeight : "430px"
              }}
            />
          ) : (
            <>
              {flightData.map((flight, key) => (
                <div
                  key={key}
                  style={{
                    padding: "10px",
                    backgroundColor: "#111111",
                    borderRadius: "9px",
                    width: "100%",
                    height: "60px",
                    border: "1px solid #555555",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr 1fr",
                    gap: "10px",
                  }}
                >
                  <img
                    src={flight.image}
                    alt={flight.name}
                    style={{
                      height: "35px",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                  <p>{flight.name}</p>
                  <p>{Cashify(flight.cost.replaceAll(",", ""))}</p>
                </div>
              ))}
            </>
          )}
        </Tabs.Content>
        <Tabs.Content className="TabsContent" value="tab3">
          <p>Bus</p>
        </Tabs.Content>
        <Tabs.Content className="TabsContent" value="tab4">
          <p>Trains</p>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}

export default ContentContainer;
