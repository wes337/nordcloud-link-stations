import { getBestLinkStationForDevice } from "./functions";

describe("getBestLinkStationForDevice", () => {
  const linkStations = [
    { x: 0, y: 0, reach: 10 },
    { x: 20, y: 20, reach: 5 },
    { x: 10, y: 0, reach: 12 },
  ];

  it("should return first link station with power 100", () => {
    const point = { x: 0, y: 0 };
    const bestStation = getBestLinkStationForDevice(point, linkStations);

    expect(bestStation).toMatchObject({
      linkStation: linkStations[0],
      power: 100,
    });
  });

  it("should return no stations available", () => {
    const point = { x: 100, y: 100 };
    const bestStation = getBestLinkStationForDevice(point, linkStations);

    expect(bestStation).toMatchObject({
      linkStation: null,
      power: 0,
    });
  });

  it("should return last link station with power 0.67", () => {
    const point = { x: 15, y: 10 };
    const bestStation = getBestLinkStationForDevice(point, linkStations);

    expect(bestStation).toMatchObject({
      linkStation: linkStations[2],
      power: 0.6718427000252355,
    });
  });

  it("should return second link station with power 4.71", () => {
    const point = { x: 18, y: 18 };
    const bestStation = getBestLinkStationForDevice(point, linkStations);

    expect(bestStation).toMatchObject({
      linkStation: linkStations[1],
      power: 4.715728752538098,
    });
  });
});
