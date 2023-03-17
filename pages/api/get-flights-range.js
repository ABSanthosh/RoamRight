export default async function handler(req, res) {
  // "https://travel.paytm.com/api/a/flights/v1/get_fares?adults=1&children=0&infants=0&class=E&client=web&destination=BLR&end_date=2023-04-26&source=DEL&start_date=2023-03-17";

  //   get today's date in YYYY-MM-DD format
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();
  const todayDate = yyyy + "-" + mm + "-" + dd;

  const urlBuilder = (
    adults = 1,
    children = 0,
    infants = 0,
    classType, // E or B
    destination,
    end_date,
    source
  ) => {
    return `https://travel.paytm.com/api/a/flights/v1/get_fares?adults=${adults}&children=${children}&infants=${infants}&class=${classType}&client=web&destination=${destination}&end_date=${end_date}&source=${source}&start_date=${todayDate}`;
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

  const data = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36",
    },
  }).then((response) => response.json());

  console.log(apiUrl);

  res.status(200).json({ data, scrapeLink });
}
