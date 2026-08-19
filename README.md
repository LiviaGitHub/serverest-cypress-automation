# ServeRest Cypress Automation

Frontend and API automated test suite for ServeRest, developed with Cypress and JavaScript.

## Applications Under Test

- Frontend: `https://front.serverest.dev/`
- API / Swagger: `https://serverest.dev/`

## Tech Stack

- Cypress
- JavaScript
- Page Object Model
- Service Object Pattern
- Custom Cypress Commands
- Fixtures
- GitHub Actions
- Mochawesome

## Test Coverage

### Frontend E2E

1. Reject registration with an already registered email
2. Display an error when logging in with invalid credentials
3. Search for a product and add it to the shopping list

### API

1. Create a user and validate persisted data
2. Reject product creation by a non-admin user
3. Create and retrieve a product as an authenticated administrator

### Test Scenario Selection

The scenarios were selected to provide balanced coverage across different types of risk and application behavior, rather than focusing only on happy paths.

The test suite combines positive and negative scenarios, business-rule validation, authentication and authorization checks, data persistence validation, and an end-to-end product flow.

Given the limited scope of three frontend and three API scenarios, the goal was to cover different critical behaviors while demonstrating both functional validation and risk-based testing.

## Architecture

Page Objects encapsulate UI selectors and interactions so the test specifications remain focused on business behavior.

Service Objects encapsulate API communication and keep request implementation separate from assertions and scenarios.

Fixtures centralize reusable test data, while helper functions generate unique values for data that must not collide in the shared ServeRest environment.

Custom commands are used only for highly reusable setup flows, such as creating and authenticating a user.

## Installation

```bash
npm install
```

## Run Tests

Open Cypress:

```bash
npm run cy:open
```

Run the complete suite:

```bash
npm run cy:run
```

Run only frontend tests:

```bash
npm run test:frontend
```

Run only API tests:

```bash
npm run test:api
```

## CI/CD

GitHub Actions executes the Cypress suite on pushes and pull requests to `main`. Test reports are uploaded as workflow artifacts.

## Reporting

The project uses Allure Report for automated test reporting.

Test results are generated during Cypress execution and stored in the `allure-results` directory.

To generate the HTML report:

```bash
npm run allure:generate

## Test Design

The suite intentionally includes:
- Happy-path coverage
- Negative validation
- UI business flows
- API authentication
- API chaining
- Dynamic test data
- Backend persistence validation
- Test-data cleanup

## Notes

ServeRest is a shared public test environment. Dynamic data is used to reduce collisions with other users.

UI selectors should always be verified against the current ServeRest frontend before final delivery, since the public application can evolve over time.
```
