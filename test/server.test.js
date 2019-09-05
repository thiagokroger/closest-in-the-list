'use strict';
import server from '../src/server';
import axios from 'axios';
import capitals from './capitals.json';

describe('Server', () => {
  const port = 8088;
  const endpoint = `http://localhost:${port}`;
  const locationsEndpoint = `${endpoint}/locations`;
  const healthEndpoint = `${endpoint}/health`;

  beforeAll(async function() {
    return server.listen(port);
  });

  it('Should throw an error when the body format is wrong', async () => {
    const body = { LOCATION: ['new york city'] };
    try {
      await axios.post(locationsEndpoint, body);
    } catch (e) {
      expect(e.response.data).toEqual(
        'Please, provide at least 2 valid addresses'
      );
    }
  });

  it('Should throw an error when the locations length is below 2', async () => {
    const body = { locations: [] };
    try {
      await axios.post(locationsEndpoint, body);
    } catch (e) {
      expect(e.response.data).toEqual(
        'Please, provide at least 2 valid addresses'
      );
    }
  });

  it('Should throw an error when the valid locations length is below 2', async () => {
    const body = { locations: ['new york city', 'asdasdasdasd'] };
    try {
      await axios.post(locationsEndpoint, body);
    } catch (e) {
      expect(e.response.data).toEqual(
        'Please, provide at least 2 valid addresses'
      );
    }
  });

  it('Should find the correct distance between 2 points', async () => {
    const body = { locations: ['new york city', 'miami'] };

    const { data } = await axios.post(locationsEndpoint, body);

    expect(data[0].closestDistance).toEqual(1092.293970003008);
  });

  it('Should find the closest city between 3', async () => {
    const body = { locations: ['new york city', 'london', 'tokyo'] };

    const { data } = await axios.post(locationsEndpoint, body);

    expect(data[0].closestId).toEqual(1); // nyc is closer to london over tokyo
    expect(data[1].closestId).toEqual(0); // london is closer to nyc over tokyo
    expect(data[2].closestId).toEqual(1); // tokyo is closer to london over nyc
  });

  it('Should find the multiple locations and get correct distances (stress)', async () => {
    const body = { locations: capitals };

    const { data } = await axios.post(locationsEndpoint, body);

    expect(data[15].closestId).toEqual(198); // the closest capital to Vienna is Bratislava
    expect(data[31].closestId).toEqual(168); // the closest capital to Brasilia is Asunción
    expect(data[165].closestId).toEqual(110); // the closest capital to Jerusalem is Amman
  });
});
