import * as Playwright from "playwright";

export default async function handler(req, res) {
  const url = `https://tickets.paytm.com/flights/flightSearch/${req.body.source}-${req.body.fromCity}/${req.body.destination}-${req.body.toCity}/1/0/0/E/${req.body.end_date}`;
  console.log(url);
  // const url =
  //   "https://tickets.paytm.com/flights/flightSearch/DEL-Delhi/JAI-Jaipur/1/0/0/E/2023-04-01";

  const browser = await Playwright.chromium.launch({
    headless: true,
  });

  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForSelector("div[class='_2JLq']");
  const elements = await page.$$("._2JLq ._3215");
  const data = [];

  for (const element of elements) {
    const div1 = await element.$("._1Eia");
    const div2 = await element.$("._2GoO");
    const divsInside = await element.$$("._3Lds > div");
    const div3 = await element.$("._3H-S._1wD5");
    const divs2 = await element.$$("._3zzl._1OV0 > div");
    const div4 = await element.$("._1cxG");
    const div5 = await element.$(".NqXj._308g");
    const image = await element.$("div._1yFI > div > img");

    const innerText1 = await div1.innerText();
    const innerText2 = await div2.innerText();
    const innerText3 = await divsInside[0].innerText();
    const innerText4 = await divsInside[1].innerText();
    const innerText5 = (await div3.innerText()).split("\n")[0];
    const innerText6 = (await div3.innerText()).split("\n")[1];
    const innerText7 = await divs2[0].innerText();
    const innerText8 = await divs2[1].innerText();
    const innerText9 = await div4.innerText();
    const innerText10 = div5 === null ? "" : await div5.innerText();
    const innerText11 = await image.getAttribute("src");

    data.push({
      name: innerText1,
      id: innerText2,
      departureTime: innerText3,
      departureCity: innerText4,
      arrivalTime: innerText5,
      arrivalCity: innerText6,
      duration: innerText7,
      isNonStop: innerText8,
      cost: innerText9,
      isNextDay: innerText10,
      image: innerText11,
    });
  }

  // page.waitForTimeout(5000);
  await browser.close();

  res.status(200).json({
    data,
    url,
  });
}
