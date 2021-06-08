# Link Station Assignment

A program that finds the link station with the most power for a device at a given point.

## Usage

Hosted as a serverless cloud function on Firebase. If you're only interested in the function logic, please see `functions/src/functions.ts`.
You can also run the unit tests using `npm run test` inside the functions directory _(Node version 14.16.0)_.

#### Find the best link station

You can get the most suitable _(highest power)_ link station for a device by using the following cloud function:

https://us-central1-link-stations.cloudfunctions.net/getBestLinkStation?x=0&y=0

Replace `x=0&y=0` with the coordinates of the device.

#### Add more link stations

You can also add more link stations using this function and providing the x, y, and reach:

https://us-central1-link-stations.cloudfunctions.net/addLinkStation?x=20&y=20&reach=5

All link stations from the assignment document have already been added.

## Authors

- **Wesley Moses** - [wes337](https://github.com/wes337)
