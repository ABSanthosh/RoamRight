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

  console.log(promptBuilder(req.body.city, req.body.date, req.body.noOfDays));

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

  res.status(200).json({
    text: `
Day 1: Arrival and City Tour
- Arrive in Jaipur and check into your hotel.
- In the afternoon, take a city tour and visit some of the popular landmarks like Hawa Mahal, City Palace, Jantar Mantar, and Albert Hall Museum.
- In the evening, head to Chokhi Dhani for a traditional Rajasthani dinner and cultural show.

Day 2: Amber Fort and Local Market
- Start your day with a visit to the stunning Amber Fort, located about 11 km from Jaipur.
- After exploring the fort, head back to Jaipur and spend the afternoon exploring the local markets, like Johari Bazaar and Bapu Bazaar.

Day 3: Day Trip to Pushkar
- Take a day trip to the holy city of Pushkar, located about 150 km from Jaipur.
- Visit the famous Pushkar Lake, Brahma Temple, and the colorful local market.
- Return to Jaipur in the evening.

Day 4: Jaipur Sightseeing and Shopping
- Spend the day exploring some of the other popular attractions in Jaipur like Nahargarh Fort, Jaigarh Fort, and the Jal Mahal.
- In the evening, indulge in some shopping at the famous Bazaars of Jaipur.

Day 5: Elephant Village and Departure
- Start the day with a visit to the Elefantastic Elephant Village and spend some time with the gentle giants.
- After the visit, it's time to depart from Jaipur and head back home.  `,
  });
}
