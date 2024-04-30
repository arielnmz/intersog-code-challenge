INTERSOG code challenge repository

## Getting Started

1. Make sure you are using an up to date version of node >= 18
   - You can use the included `.tool-versions` file for [asdf](https://asdf-vm.com/) to set up the node version.
2. Install deps from the root of the repo 
    ```shell
    npm i
    ```
3. Run the demo using next.js' own scripts:
    ```bash
    npm run dev
    ```
4. Navigate to [http://localhost:3000](http://localhost:3000) with your browser to browse some pokemon.

## Contributing

This project uses prettier and eslint for formatting and linting.

## Caveats

- The project was built using [Next.js' App router](https://nextjs.org/docs#app-router-vs-pages-router), hence the need
for a [current Node.js version](https://nextjs.org/docs/getting-started/installation).
- Almost all components are server side.
- The API serves as a proxy between the application and the Pokemon API.
- A middleware was implemented to allow CORS requests but GET requests may sometimes not require a preflight, hence the
need for the [quick&dirty request origin hack](src%2Fmiddleware.ts).
- Completely skipped tests intentionally.
  

## Authentication

> **TL;DR**  
> Log in using `foo@example.com`/`test`.

The authentication system uses `Next.js`' own facilities to submit forms (server actions).

It authenticates against an in-memory database seeded with a single user (see TL;DR).

## Navigation

It should be very simple: just click on the pokemon and browse its details. Click on the `Load more...` buttons to get 
matchups. If you get lost click on the `Intersog Code Challenge` link at the top right.
