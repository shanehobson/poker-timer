# Poker Blinds Tracker

A browser-based timer for home poker games that counts down to each blind increase and raises the blinds automatically when time runs out.

> Built in 2018. This project is not actively maintained.

## Features

- Countdown timer with play, pause, and reset controls
- Configurable blind interval (5 to 30 minutes, 15 by default)
- Configurable starting big blind and a cap on the big blind
- Blinds double at the end of each interval until they reach the cap; the small blind is always half the big blind
- Heads-up mode: arrows next to two player names alternate each level to show who posts the big blind
- Plays a short video alert when the blinds go up, then restarts the timer

## Tech Stack

- Vanilla JavaScript (ES2015+), HTML, CSS
- Babel via Gulp for transpiling
- Express for serving the static build
- Font Awesome icons

## Getting Started

```bash
npm install
npm start
```

Then open `http://localhost:3000`. The server uses the `PORT` environment variable if it is set.

The compiled app is committed in `dist/`. The source lives in `src/js/script.js`, and the Gulp `babel` task compiles it into `dist/js/`:

```bash
npx gulp babel
```

## Project Structure

```
src/js/script.js   # Timer and blinds logic (source)
dist/              # Static site served by Express (HTML, CSS, compiled JS, assets)
gulpfile.js        # Babel build task
server.js          # Express static server
```
