export default async function handler(req, res) {
  const urlBuilder = (
    adults = 1,
    children = 0,
    infants = 0,
    classType, // E or B
    destination,
    end_date,
    source
  ) => {
    end_date = end_date.replaceAll("-", "");
    // https://travel.paytm.com/api/flights/v2/search?accept=combination&enable={%22handBaggageFare%22:true,%22paxWiseConvFee%22:true,%22minirules%22:true}&adults=1&children=0&class=E&client=web&departureDate=20230331&origin=AMD&infants=0&destination=BLR
    return `https://travel.paytm.com/api/flights/v2/search?accept=combination&enable={%22handBaggageFare%22:true,%22paxWiseConvFee%22:true,%22minirules%22:true}&adults=${adults}&children=${children}&class=${classType}&client=web&departureDate=${end_date}&origin=${source}&infants=${infants}&destination=${destination}`;
  };

  const scrapeLink = `https://tickets.paytm.com/flights/flightSearch/${req.body.source}/${req.body.destination}/1/0/0/E/${req.body.end_date}`;

  const apiUrl = urlBuilder(
    req.body.adults,
    req.body.children,
    req.body.infants,
    req.body.classType,
    req.body.destination,
    req.body.end_date,
    req.body.source
  );
  console.log(apiUrl);

  const data = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36",
    },
  }).then((response) => response.json());

  res.status(200).json({
    data: {
      flights: data.body.onwardflights.flights,
      meta: data.body.onwardflights.meta,
    },
    scrapeLink,
  });
}
