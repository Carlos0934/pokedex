import { type PageProps } from "$fresh/server.ts";
import { createHomeState } from "../lib/state/home/state.ts";

export default function App({ Component }: PageProps) {
  const appState = createHomeState();

  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Pokedex</title>

        <link rel="stylesheet" href="/styles.css" />
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
