import { LinkStation, Point } from "./types";

export const linkStations = [
  <LinkStation>{ location: { x: 0, y: 0 }, reach: 10 },
  <LinkStation>{ location: { x: 20, y: 20 }, reach: 5 },
  <LinkStation>{ location: { x: 10, y: 0 }, reach: 12 },
];

export const devices = [
  <Point>{ x: 0, y: 0 },
  <Point>{ x: 100, y: 100 },
  <Point>{ x: 15, y: 10 },
  <Point>{ x: 18, y: 18 },
];
