import React from "react";
import "./ContentContainer.scss";
import * as Tabs from "@radix-ui/react-tabs";

function ContentContainer({}) {
  return (
    <div className="ContentContainer">
      <Tabs.Root className="TabsRoot" defaultValue="tab1">
        <Tabs.List className="TabsList">
          <Tabs.Trigger className="TabsTrigger" value="tab1">
            Itinerary
          </Tabs.Trigger>
          <Tabs.Trigger className="TabsTrigger" value="tab2">
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
        <Tabs.Content className="TabsContent" value="tab2">
          <p>Flights</p>
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
