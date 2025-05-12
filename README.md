# Weather App

This is a simple yet informative weather app built as the end-of-course project in the course Verkkojulkastuminen Perusteet (VJP) that I took part in during the spring of 2025. 

The user can enter their city and get relevant temperature data for today, tomorrow and the incoming days.

For the questions included in the actual assignment (saateteksti), [go here](#mitä-opitte-git-yhteistyöstä-ja-yhdessä-projektin-tekemisestä-mitä-haasteita-yhteistyö-gitissä-mahdollisesti-aiheutti).

### Regarding the assignment requirements
The Figma file is in the root of the project. The external React library I used was [Recharts](https://recharts.org/en-US).


## Technical details

The app uses React as the frontend framework and React Router for routing between the pages. The app consists of a variety of components that build up the pages in the website.

The loading animation in the start is there for a reason. The weather API usage was quite restricted and loading in the temperatures for the default cities on the HomePage take too long. It looks silly to the user and that is why there is a slight loading before passing the user on to the website, to ensure that their experience is better on the website.

### Regarding the assignment requirements
The Figma file is in the root of the project. The external React library I used was [Recharts](https://recharts.org/en-US).

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

I did this project alone, since I'm not in the VDM course. I can however answer this question based on previous similar experience. Running into merge conflicts and be rough and time-consuming. Sometimes when you have to revert version when you are not comfortable with using Git, it can be quite stressful.

## Millaista työnjaon tekeminen oli? Oliko helppoa jakaa työ tehtäviin palasiin ryhmäläisten kesken?

I did this project alone.

## Mitä uutta opitte UI-suunnittelusta viestinnän keinona?

One lesson I have learned over and over again is that simpler UI is better in most cases, since in the end there isn't many reasons to show a lot of unnecessary things to the user that doesn't serve any purpose. I believe this is one of the first projects where I was able to keep the UI truly simple, from beginning to end. I think the reason for this is mostly Figma, since I started with the design and adhered to it during the code implementation. 

## Jos hyödynsitte tehtävän teossa tekoälyä, millä tavalla?

My principle with AI usage is to try to never copy straight from the AI. Also to just ask specific questions is important, if it starts generating all the code, that is when you stop learning. 

There were a few specific things where AI helped me a lot. For example, connecting the "Loading the weather data..." component correctly to the rest of the website was hard and I was unsure how to do it. In that situation AI provided a clear way and saved me a lot of time. It was a specific problem and I learned from the implemention that AI provided.