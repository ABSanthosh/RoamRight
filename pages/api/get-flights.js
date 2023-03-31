import flightsHelper from "../../utils/ApiHelpers/flightsHelper";

export default async function handler(req, res) {
  const data = await flightsHelper(req.body);
  const scrapeLink = `https://tickets.paytm.com/flights/flightSearch/${req.body.source}/${req.body.destination}/1/0/0/E/${req.body.end_date}`;

  res.status(200).json({
    data,
    scrapeLink,
  });
}
