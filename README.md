# Unidonut
### A platform to meet other university students

#### Technologies
- Frontend: React + Typescript
- UI Library: Ant Design UI
- Backend: Golang + Gin
- Database: MongoDB

#### Setup
- Install Node.js and then install yarn with `npm install --global yarn` if you haven't already.
- `yarn install` to install project dependencies (first-time)
- Install Golang if you haven't already for backend
- Recommended: Use VS Code for development, it integrates perfectly.

#### Running the dev server
- `yarn start` in root directory to run dev, eventually this will become a monorepo for frontend and backend
- `go build` in `/backend` and then `./unidonut` for it to start listening on :8000.
- TODO: automatic environment variable configuration

#### Roadmap:
- Create login system + user profile interface
- Generate pairings at the beginning of every week based on whether user opts in for that week (default to no)
- Allow user to populate with interests, hobbies, etc
- Create user pairing interface (a la Donut bot), filter by gender (?)
- Create chat interface
- Kind of like "verified Omegle" that's text-only?


