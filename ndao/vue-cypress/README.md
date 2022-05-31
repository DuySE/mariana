## How to Run Demo Application

In demo-application directory, execute: docker-compose up --build (Docker Desktop is required)

## How to Run E2E Test

In demo-application/client directory, execute: 
- UI: npx cypress open, npx cypress open-ct
- CLI: npx cypress run/yarn test, npx cypress run-ct/yarn cy:run-ct, yarn cy:run-e2e