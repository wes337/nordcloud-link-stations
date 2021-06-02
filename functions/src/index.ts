import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { Point, LinkStation } from "./types";
import { getBestLinkStationForDevice } from "./functions";

admin.initializeApp();

export const getBestLinkStation = functions.https.onRequest(
  async (req, res) => {
    try {
      if (!req.query || !req.query.x || !req.query.y) {
        throw new Error("Please provide an x and y coordinate.");
      }

      const x = parseInt(req.query.x as string);
      const y = parseInt(req.query.y as string);

      if (isNaN(x) || isNaN(y)) {
        throw new Error("Coordinates must be numbers.");
      }

      const device = <Point>{ x, y };

      const querySnapshot = await admin
        .firestore()
        .collection("linkStations")
        .get();

      const linkStations = [] as LinkStation[];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        linkStations.push({
          x: data.x,
          y: data.y,
          reach: data.reach,
        });
      });

      const { linkStation, power } = getBestLinkStationForDevice(
        device,
        linkStations
      );

      const response = linkStation
        ? `Best link station for point ${device.x}, ${device.y} is ${
            linkStation.x
          }, ${linkStation.y} with power ${power.toFixed(2)}`
        : `No link station within reach for ${device.x}, ${device.y}`;

      res.json(response);
    } catch (error) {
      res.json({ error: error.message });
    }
  }
);

export const addLinkStation = functions.https.onRequest(async (req, res) => {
  try {
    if (!req.query || !req.query.x || !req.query.y || !req.query.reach) {
      throw new Error(
        "Please provide an x and y coordinate, and a reach value."
      );
    }

    const x = parseInt(req.query.x as string);
    const y = parseInt(req.query.y as string);
    const reach = parseInt(req.query.reach as string);

    if (isNaN(x) || isNaN(y) || isNaN(reach)) {
      throw new Error("Coordinates and reach must be numbers.");
    }

    let exists = await admin
      .firestore()
      .collection("linkStations")
      .where("x", "==", x)
      .where("y", "==", y)
      .get()
      .then((querySnapshot) => {
        return querySnapshot.size > 0;
      });

    if (exists) {
      res.json({
        error: "Link station already exists at these coordinates.",
      });
    } else {
      const newLinkStation = await admin
        .firestore()
        .collection("linkStations")
        .add(<LinkStation>{
          x,
          y,
          reach,
        });

      res.json({ result: `Link station with ID: ${newLinkStation.id} added.` });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});
