# closest-in-the-list

This repo contains a solution for finding the closest location within a list of locations.

## Usage
call the `/locations` endpoint with a post containing the desired locations.

### Acceptable formats:
```
{"locations":["Madrid", "Paris"]}
```
or
```
{"locations":[[40.4167754, -3.7037902], "Paris"]}
```


## Curling the live version
```
curl -X POST \
  https://closest-in-the-list.herokuapp.com/locations \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{"locations":["Sukhumi","Kabul","Episkopi Cantonment","Tirana","Algiers","Pago Pago","Andorra la Vella","Luanda","The Valley","St. John'\''s","Buenos Aires","Yerevan","Oranjestad","Georgetown","Canberra","Vienna","Baku","Nassau","Manama","Dhaka","Bridgetown","Minsk","Brussels","Belmopan","Porto-Novo","Hamilton","Thimphu","Sucre","La Paz","Sarajevo","Gaborone","Brasília","Road Town","Bandar Seri Begawan","Sofia","Ouagadougou","Bujumbura","Phnom Penh","Yaoundé","Ottawa","Praia","George Town","Bangui","N'\''Djamena","Santiago","Beijing","Flying Fish Cove","West Island","Bogotá","Moroni","Avarua","San José","Zagreb","Havana","Willemstad","Nicosia","Prague","Yamoussoukro","Kinshasa","Copenhagen","Djibouti","Roseau","Santo Domingo","Dili","Hanga Roa","Quito","Cairo","San Salvador","Malabo","Asmara","Tallinn","Addis Ababa","Stanley","Tórshavn","Palikir","Suva","Helsinki","Paris","Cayenne","Papeete","Libreville","Banjul","Tbilisi","Berlin","Accra","Gibraltar","Athens","Nuuk","St. George'\''s","Hagåtña","Guatemala City","St. Peter Port","Conakry","Bissau","Georgetown","Port-au-Prince","Tegucigalpa","Budapest","Reykjavík","New Delhi","Jakarta","Tehran","Baghdad","Dublin","Douglas","Jerusalem","Rome","Kingston","Tokyo","St. Helier","Amman","Astana","Nairobi","Tarawa","Pristina","Kuwait City","Bishkek","Vientiane","Riga","Beirut","Maseru","Monrovia","Tripoli","Vaduz","Vilnius","Luxembourg","Skopje","Antananarivo","Lilongwe","Kuala Lumpur","Malé","Bamako","Valletta","Majuro","Nouakchott","Port Louis","Mexico City","Chisinau","Monaco","Ulaanbaatar","Podgorica","Plymouth","Rabat","Maputo","Naypyidaw","Stepanakert","Windhoek","Yaren","Kathmandu","Amsterdam","Nouméa","Wellington","Managua","Niamey","Abuja","Alofi","Kingston","Pyongyang","Nicosia","Belfast","Saipan","Oslo","Muscat","Islamabad","Ngerulmud","Jerusalem","Panama City","Port Moresby","Asunción","Lima","Manila","Adamstown","Warsaw","Lisbon","San Juan","Doha","Taipei","Brazzaville","Bucharest","Moscow","Kigali","Gustavia","Jamestown","Basseterre","Castries","Marigot","St. Pierre","Kingstown","Apia","San Marino","Riyadh","Edinburgh","Dakar","Belgrade","Victoria","Freetown","Singapore","Philipsburg","Bratislava","Ljubljana","Honiara","Mogadishu","Hargeisa","Pretoria","Grytviken","Seoul","Tskhinvali","Juba","Madrid","Sri Jayawardenapura Kotte","Khartoum","Paramaribo","Mbabane","Stockholm","Bern","Damascus","São Tomé","Dushanbe","Dodoma","Bangkok","Lomé","Nukuʻalofa","Tiraspol","Port of Spain","Edinburgh of the Seven Seas","Tunis","Ankara","Ashgabat","Cockburn Town","Funafuti","Kampala","Kiev","Abu Dhabi","London","Washington, D.C.","Charlotte Amalie","Montevideo","Tashkent","Port Vila","Vatican City","Caracas","Hanoi","Cardiff","Mata-Utu","El Aaiún","Sanaá","Lusaka","Harare"]}'
```

## Running locally
```
npm i && npm run dev
```

## Example request
```
POST http://localhost:8080/locations {"locations":["New York City", "London", "Tokyo"]}
```

## Example response
```
[
    {
        "id": 0,
        "location": "New York City",
        "lat": 40.7127753,
        "lng": -74.0059728,
        "closestDistance": 3461.0118044383585,
        "closestId": 1
    },
    {
        "id": 1,
        "location": "London",
        "lat": 51.5073509,
        "lng": -0.1277583,
        "closestDistance": 3461.0118044383585,
        "closestId": 0
    },
    {
        "id": 2,
        "location": "Tokyo",
        "lat": 35.6761919,
        "lng": 139.6503106,
        "closestDistance": 5939.131618959497,
        "closestId": 1
    }
]
```

## Testing
This repo uses Jest for running the tests

```
npm run test
```
