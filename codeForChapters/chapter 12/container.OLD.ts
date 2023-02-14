/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import os from "os";
import request from "superagent";
import { FN } from "../common";
import { Container } from "./container";
import type { OPT } from "../common";

class Maybe<A> extends Functor<A> {
  // @ts-expect-error It's OK to not call super()
  constructor(x?: A | undefined | null) {
    return x === undefined || x === null
      ? new Nothing()
      : new Just(x);
  }

  orElse(v: any) {
    /* abstract */
  }

  map<B>(fn: (_: A) => B): Maybe<B> {
    return Maybe.of(fn(this.valueOf()));
  }

  static of<B>(x: B): Maybe<B> {
    return new Maybe(x);
  }
}

class Nothing extends Maybe<any> {
  isNothing() {
    return true;
  }

  toString() {
    return "Nothing()";
  }

  orElse(v: any) {
    return v;
  }

  map(fn: (..._args: any) => any) {
    return this;
  }
}

class Just<A> extends Maybe<A> {
  isNothing() {
    return false;
  }

  orElse(v: any) {
    return this.valueOf();
  }

  map<B>(fn: (_: A) => B): Just<B> {
    return new Just(fn(this.valueOf()));
  }
}

const plus1 = (x: number) => x + 1;
/*
console.log(
  Maybe.of(2209).map(plus1).map(plus1).toString()
);
// "Just(2211)"

console.log(
  Maybe.of(null).map(plus1).map(plus1).toString()
);
// "Nothing()"
*/
const getAlerts = (
  lat: number,
  long: number,
  callback: FN
) => {
  const SERVER = "https://api.darksky.net/forecast";
  const UNITS = "units=si";
  const EXCLUSIONS = "exclude=minutely,hourly,daily,flags";
  const API_KEY = "you.need.to.get.your.own.api.key";
  request
    .get(
      `${SERVER}/${API_KEY}/${lat},${long}?${UNITS}&${EXCLUSIONS}`
    )
    .end(function (err, res) {
      if (err) {
        callback({});
      } else {
        callback(JSON.parse(res.text));
      }
    });
};

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
    /* */
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
    /* */
    {
      title: "Hurricane Local Statement",
      regions: ["Austin" /* */, "Wharton"],
      severity: "advisory",
      time: 1503748800,
      expires: 1503683100,
      description:
        "This product covers Southeast Texas **HURRICANE HARVEY DANGEROUSLY APPROACHING THE TEXAS COAST** ... The next local statement will be issued by the National Weather Service in Houston/Galveston TX around 1030 AM CDT, or sooner if conditions warrant.\n",
      uri: "https://alerts.weather.gov/cap/wwacapget.php?...",
    },
  ],
};
/*
const produceAlertsTable = (weatherObj: typeof resp) =>
  Maybe.of(weatherObj)
    .map((w: typeof resp) => w.alerts)
    .map((a) =>
      a.map(
        (x) =>
          `<tr><td>${x.title}</td>` +
          `<td>${x.description.substr(0, 500)}...</td></tr>`
      )
    )
    .map((a) => a.join(os.EOL))
    .map((s) => `<table>${s}</table>`);

getAlerts(29.76, -95.37, (x) =>
  console.log(produceAlertsTable(x).valueOf())
);

getAlerts(-34.9, -54.6, (x) =>
  console.log(
    produceAlertsTable(x).orElse(
      "<span>No alerts today.</span>"
    )
  )
);
*/
class ConstantP<V> {
  private value: Maybe<V>;
  map: FN;

  constructor(v: V) {
    this.value = Maybe.of(v);
    this.map = () => this;
  }
}

export { Container, Functor, Maybe, Just, Nothing };
