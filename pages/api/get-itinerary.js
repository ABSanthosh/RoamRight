export default async function handler(req, res) {
  const url = "https://api.openai.com/v1/completions";

  const promptBuilder = (city, date, noOfDays) => {
    return (
      "give an itinerary for a trip to " +
      city +
      " on " +
      date +
      " for " +
      noOfDays +
      " days"
    );
  };

  const data = `{
      "model": "text-davinci-003",
      "prompt": "${promptBuilder(
        req.body.city,
        req.body.date,
        req.body.noOfDays
      )}",
      "temperature": 0.6,
      "max_tokens": 150,
      "top_p": 1,
      "frequency_penalty": 1,
      "presence_penalty": 1
    }`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
    },
    body: data,
  });

  const text = await response.text();

  res.status(200).json({ text });
}
