/**
 *
 * @param {
 * source: string,
 * destination: string,
 * end_date: string,
 * adults: number,
 * children: number,
 * infants: number,
 * } req
 * @returns
 * {
 * data: {
 *  flights: [],
 *  meta: {}
 * }
 */

export default async function flightsHelper(req) {
  const urlBuilder = (
    adults = 1,
    children = 0,
    infants = 0,
    classType, // E or B
    destination,
    end_date = "",
    source
  ) => {
    end_date = end_date.replaceAll("-", "");
    return `https://travel.paytm.com/api/flights/v2/search?accept=combination&enable={%22handBaggageFare%22:true,%22paxWiseConvFee%22:true,%22minirules%22:true}&adults=${adults}&children=${children}&class=${classType}&client=web&departureDate=${end_date}&origin=${source}&infants=${infants}&destination=${destination}`;
  };

  const scrapeLink = `https://tickets.paytm.com/flights/flightSearch/${req.source}/${req.destination}/1/0/0/E/${req.end_date}`;

  const apiUrl = urlBuilder(
    req.adults,
    req.children,
    req.infants,
    req.classType,
    req.destination,
    req.end_date,
    req.source
  );

  console.log(req);

  const data = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36",
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));

  console.log(scrapeLink);

  return {
    flights: data.body.onwardflights.flights,
    meta: data.body.onwardflights.meta,
  };
}
