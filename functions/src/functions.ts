import { Point, LinkStation } from "./types";

const getDistance = (a: Point, b: Point) => {
  const x = b.y - a.y;
  const y = b.x - a.x;

  return Math.sqrt(x * x + y * y);
};

const getLinkStationPower = (device: Point, linkStation: LinkStation) => {
  const { reach, x, y } = linkStation;
  const distance = getDistance(device, <Point>{ x, y });

  return distance > reach ? 0 : Math.pow(reach - distance, 2);
};

export const getBestLinkStationForDevice = (
  device: Point,
  linkStations: LinkStation[]
): { linkStation: LinkStation | null; power: number } => {
  let best = {
    linkStation: null,
    power: 0,
  };

  linkStations.forEach((linkStation) => {
    const power = getLinkStationPower(device, linkStation);

    if (power > best.power) {
      best = {
        linkStation: linkStation as any,
        power,
      };
    }
  });

  return best;
};
