import { Either, Left, Right } from "./either";
import { getField } from "../chapter 06/getField";

import request from "superagent";
import os from "os";
import type { FN } from "../common";

const resp = {
  latitude: 29.76,
  longitude: -95.37,
  timezone: "America/Chicago",
  offset: -5,
  currently: {
    time: 1503660334,
    summary: "Drizzle",
    icon: "rain",
    temperature: 24.97,
    // ...
    uvIndex: 0,
  },
  alerts: [
    {
      title: "Tropical Storm Warning",
      regions: ["Harris"],
      severity: "warning",
      time: 1503653400,
      expires: 1503682200,
      description:
        "TROPICAL STORM WARNING REMAINS IN EFFECT... WIND - LATEST LOCAL FORECAST: Below tropical storm force wind ... CURRENT THREAT TO LIFE AND PROPERTY: Moderate ... Locations could realize roofs peeled off buildings, chimneys toppled, mobile homes pushed off foundations or overturned ...",
      uri: "https://alerts.weather.gov/cap/wwacapget.php?x=TX125862DD4F88.TropicalStor   mWarning.125862DE8808TX.HGXTCVHGX.73ee697556fc6f3af7649812391a38b3",
    },
    // ...
    {
      title: "Hurricane Local Statement",
      regions: [
        "Austin", // ...
        "Wharton",
      ],
      severity: "advisory",
      time: 1503748800,
      expires: 1503683100,
      description:
        "This product covers Southeast Texas **HURRICANE HARVEY DANGEROUSLY APPROACHING THE TEXAS COAST** ... The next local statement will be issued by the National Weather Service in Houston/Galveston TX around 1030 AM CDT, or sooner if conditions warrant.\n",
      uri: "https://alerts.weather.gov/cap/wwacapget.php?...",
    },
  ],
};

const getAlerts2 = (
  lat: number,
  long: number,
  callback: FN
) => {
  const SERVER = "https://api.darksky.net/forecast";
  const UNITS = "units=si";
  const EXCLUSIONS = "exclude=minutely,hourly,daily,flags";
  const API_KEY = "you.have.to.get.your.own.key";

  request
    .get(
      `${SERVER}/${API_KEY}/${lat},${long}` +
        `?${UNITS}&${EXCLUSIONS}`
    )
    .end((err, res) =>
      callback(
        err
          ? Either.of("AJAX FAILURE", null)
          : Either.of(null, resp || JSON.parse(res.text)) // faking reply!
      )
    );
};

const produceAlertsTable2 = (
  weatherObj: Either<typeof resp, any>
) => {
  return weatherObj
    .chain((obj: typeof resp) => {
      const alerts = getField("alerts")(obj);
      return alerts
        ? Either.of(null, alerts)
        : Either.of("NO ALERTS", null);
    })
    .chain((a: typeof resp.alerts) =>
      a.map(
        (x) =>
          `<tr><td>${x.title}</td>` +
          `<td>${x.description.substr(0, 500)}...</td></tr>`
      )
    )
    .chain((a: string[]) => a.join(os.EOL))
    .chain((s: string) => `<table>${s}</table>`);
};

// Houston, TX, US:
getAlerts2(29.76, -95.37, (x) =>
  console.log(produceAlertsTable2(x).toString())
);
// Right("...a table with alerts: lots of HTML code...");

// Montevideo, UY
getAlerts2(-34.9, -54.6, (x) =>
  console.log(produceAlertsTable2(x).toString())
);
// Left("NO ALERTS");

// A point with wrong coordinates
getAlerts2(444, 555, (x) =>
  console.log(produceAlertsTable2(x).toString())
);
// Left("AJAX FAILURE");

export { Either, Left, Right };
