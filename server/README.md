# Movie API

Small Express server that serves the movie catalog. The Expo app reads it through `EXPO_PUBLIC_API_URL`. Without that variable, the app keeps using mock data.

## Install and run

From `server/`:

```bash
npm install
npm start
```

The server listens on `0.0.0.0:3000`. On the first start it copies `data/movies.seed.json` to `data/movies.json` and reads from that file afterward. `movies.json` is gitignored, so local edits are not committed.

## Check it from your laptop

```bash
curl http://127.0.0.1:3000/movies
curl "http://127.0.0.1:3000/movies?genre=Sci-Fi"
curl http://127.0.0.1:3000/movies/1
curl -i http://127.0.0.1:3000/movies/missing
```

An unknown id returns `404` and `{ "error": "Movie not found" }`.

## Point the app at this machine

1. Find your laptop's IP. On macOS Wi-Fi that is usually:

   ```bash
   ipconfig getifaddr en0
   ```

2. On your phone (same network), open `http://<your-ip>:3000/movies` in the browser. You should see the movie JSON.

3. In the project root, create `.env.local` (it is gitignored):

   ```
   EXPO_PUBLIC_API_URL=http://<your-ip>:3000
   ```

4. Restart Expo (`npx expo start`). The API test screen (wrench icon on Discover) loads `/movies` from that URL. Genre buttons refetch with `?genre=`.

## Wi-Fi

Campus Wi-Fi often blocks phone-to-laptop traffic. `npx expo start --tunnel` only tunnels the Expo app, not this server. If the phone cannot open `http://<your-ip>:3000/movies`, share a hotspot from the phone, join it from the laptop, and put that new IP in `.env.local`.
