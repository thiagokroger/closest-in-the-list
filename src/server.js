import express from 'express';
import bodyParser from 'body-parser';
import config from './config.js';
import { createClient } from '@google/maps';

// server config
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
const routes = express.Router();
routes.get('/health', (req, res) => res.sendStatus(200));
routes.post('/locations', locationsHandler);
app.use('/', routes);

// locations handler
async function locationsHandler(req, res) {
  let { locations = [] } = req.body;

  if (locations.length < 2) {
    res.status(401).send('Please, provide at least 2 valid addresses');
    return;
  }

  locations = await Promise.all(
    locations.map((location, id) => formatLocation(location, id))
  );

  if (locations.filter(location => !location.invalid).length < 2) {
    res.status(401).send('Please, provide at least 2 valid addresses');
    return;
  }

  res.json(calculateClosest(locations));
}

async function formatLocation(location, id) {
  if (location.constructor === Array) {
    const [lat, lng] = location;
    return { id, lat, lng };
  }

  const map = createClient({
    key: config.apiKey,
    Promise: Promise
  });
  try {
    const response = await map.geocode({ address: location }).asPromise();
    return { id, location, ...response.json.results[0].geometry.location };
  } catch (e) {
    return { id, invalid: true };
  }
}

function calculateClosest(locations) {
  let distancesMap = {};

  locations.forEach((item, id) => {
    locations.forEach((target, targetId) => {
      if (id === targetId) {
        return;
      }
      const key = (id < targetId ? [id, targetId] : [targetId, id]).join('_');
      if (!distancesMap[key]) {
        distancesMap[key] = calculateDistance(item, target);
      }
      if (!item.closestDistance || distancesMap[key] < item.closestDistance) {
        item.closestDistance = distancesMap[key];
        item.closestId = targetId;
      }
    });
  });

  return locations;
}

function calculateDistance(a, b) {
  if (a.lat == b.lat && a.lng == b.lng) {
    return 0;
  } else {
    const radA = (Math.PI * a.lat) / 180;
    const radB = (Math.PI * b.lat) / 180;
    const theta = a.lng - b.lng;
    const radTheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radA) * Math.sin(radB) +
      Math.cos(radA) * Math.cos(radB) * Math.cos(radTheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    return dist;
  }
}
export default app;
