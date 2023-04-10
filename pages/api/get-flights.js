import edgeChromium from "chrome-aws-lambda";
import puppeteer from "puppeteer-core";

const LOCAL_CHROME_EXECUTABLE =
  process.platform === "linux"
    ? "/usr/bin/google-chrome"
    : "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";

export default async function handler(req, res) {
  const url = `https://tickets.paytm.com/flights/flightSearch/${req.body.source}-${req.body.fromCity}/${req.body.destination}-${req.body.toCity}/1/0/0/E/${req.body.end_date}`;
  // const url = "https://tickets.paytm.com/flights/flightSearch/DEL-Delhi/JAI-Jaipur/1/0/0/E/2023-04-01";

  const executablePath = await edgeChromium.executablePath || LOCAL_CHROME_EXECUTABLE;

  const browser = await puppeteer.launch({
    executablePath,
    args: edgeChromium.args,
    headless: false,
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

    const innerText1 = await div1.evaluate((node) => node.innerText);
    const innerText2 = await div2.evaluate((node) => node.innerText);
    const innerText3 = await divsInside[0].evaluate((node) => node.innerText);
    const innerText4 = await divsInside[1].evaluate((node) => node.innerText);
    const innerText5 = (await div3.evaluate((node) => node.innerText)).split(
      "\n"
    )[0];
    const innerText6 = (await div3.evaluate((node) => node.innerText)).split(
      "\n"
    )[1];
    const innerText7 = await divs2[0].evaluate((node) => node.innerText);
    const innerText8 = await divs2[1].evaluate((node) => node.innerText);
    const innerText9 = await div4.evaluate((node) => node.innerText);
    const innerText10 =
      div5 === null ? "" : await div5.evaluate((node) => node.innerText);
    const innerText11 = await image.evaluate((node) =>
      node.getAttribute("src")
    );

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

  await browser.close();

  res.status(200).json({
    data,
  });
}
