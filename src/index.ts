import { LinkStation, Point } from "./types";
import { devices, linkStations } from "./data";

const getDistance = (a: Point, b: Point) => {
  const x = b.y - a.y;
  const y = b.x - a.x;

  return Math.sqrt(x * x + y * y);
};

const getLinkStationPower = (device: Point, linkStation: LinkStation) => {
  const { reach, location } = linkStation;
  const distance = getDistance(device, location);

  return distance > reach ? 0 : Math.pow(reach - distance, 2);
};

const getBestLinkStationForDevice = (
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
        linkStation,
        power,
      };
    }
  });

  return best;
};

const init = () => {
  devices.forEach((device) => {
    const { linkStation, power } = getBestLinkStationForDevice(
      device,
      linkStations
    );

    console.log(
      linkStation
        ? `Best link station for point ${device.x}, ${device.y} is ${
            linkStation.location.x
          }, ${linkStation.location.y} with power ${power.toFixed(2)}`
        : `No link station within reach for ${device.x}, ${device.y}`
    );
  });
};

init();
