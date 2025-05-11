# Weather App

For the questions included in the actual assignment (saateteksti), go here.

This is a simple yet beautiful and informative weather app built with React for the end-of-course project in the course Verkkojulkastuminen Perusteet (VJP) that I took part in during the spring of 2025. The user can enter their city and get relevant temperature data for today, tomorrow and the incoming days.

## Technical details

The app uses React as the frontend framework and React Router for routing between the pages. The app consists of a variety of components that build up the pages in the website.

## API Usage

My website uses to external APIs. For the weather data, I chose to use Open-Meteo since it was free and easy to set up. 

```
const weatherResponse = await fetch(
  `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode&hourly=temperature_2m&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=7`
);
```

I also needed an API for geocoding; I needed to convert city names to latitude and longitude coordinates since Open-Meteo could only find the weather data based on city names. 

```
const weatherResponse = await fetch(
  `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode`
);

```

## Mitä opitte git yhteistyöstä ja yhdessä projektin tekemisestä? Mitä haasteita yhteistyö gitissä mahdollisesti aiheutti?

I did this project alone since I don't go 

Millaista työnjaon tekeminen oli? Oliko helppoa jakaa työ tehtäviin palasiin ryhmäläisten kesken?

Mitä uutta opitte UI-suunnittelusta viestinnän keinona?

Jos hyödynsitte tehtävän teossa tekoälyä, millä tavalla?