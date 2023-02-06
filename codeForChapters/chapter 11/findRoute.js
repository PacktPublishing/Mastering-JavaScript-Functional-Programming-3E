function findRoute(byMeans, fromPoint, toPoint) {
  switch (byMeans) {
    case "foot":
    /*
    find the shortest road for a walking person
    */

    case "bicycle":
    /*
    find a route apt for a cyclist
    */

    case "car-fastest":
    /*
    find the fastest route for a car driver
    */

    case "car-shortest":
    /*
    find the shortest route for a car driver

    */

    default:
    /*
    plot a straight line, or throw an error,
    or whatever suits you
    */
  }
}

textInput$.subscribe(async (fetchResult) => {
  domElem = document.getElementById("myResults");

  if (fetchResult !== null) {
    result = await fetchResult.json();
    domElem.innerHTML = result.data
      .map((x) => `${x.city}, ${x.region}, ${x.country}`)
      .join("<br />");
  } else {
    domElem.innerHTML = "";
  }
});
