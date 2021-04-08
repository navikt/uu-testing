# UU-testing

Dette er en helt basic [`create-react-app`](https://github.com/facebook/create-react-app)-app (med Typescript) som skal demonstrere hvordan man kan sette opp ulike metoder for automatisk UU-testing. Du bestemmer selv hvilke metoder som passer best for deg og ditt team.

>⚠️ Vær obs på at automatiske tester vanligvis [bare avdekker ~30% av UU-feil](https://accessibility.blog.gov.uk/2017/02/24/what-we-found-when-we-tested-tools-on-the-worlds-least-accessible-webpage/), og at man helst bør kombinere automatisk testing med både brukertester og ekspertevalueringer underveis i utviklingen.
>
>Ta kontakt med [@navikt/uu-teamet](https://github.com/orgs/navikt/teams/uu-teamet) for hjelp og veiledning.

## Metoder

### Linting

`create-react-app` inkluderer allerede [`eslint`](https://eslint.org/) & [`jsx-a11y`](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y#readme) ut-av-boksen, så du trenger ikke gjøre noe for å sette opp UU-linting med CRA.

### Enhetstester med [Jest Axe](https://github.com/nickcolley/jest-axe)

Med Jest Axe er det enkelt å f.eks. kjøre enhetstester mot enkelt-komponenter isolert:

1. Installer:
    ```bash
    npm i jest-axe @types/jest-axe --save-dev
    ```
2. Eksempel på bruk:
    ```tsx
    // MyComponent.test.tsx

    import React from 'react';
    import { render } from '@testing-library/react';
    import { axe, toHaveNoViolations } from 'jest-axe';
    import MyComponent from './MyComponent';

    expect.extend(toHaveNoViolations);

    test('MyComponent should have no a11y violations without props', async () => {
	  render(<main><MyComponent/></main>, document.body);
	  const results = await axe(document.body);
	  expect(results).toHaveNoViolations();
	});

	test('MyComponent should have no a11y violations with some prop', async () => {
	  render(<main><MyComponent greeting="Bonjour" /></main>, document.body);
	  const results = await axe(document.body);
	  expect(results).toHaveNoViolations();
	});
    ```

>⚠️ Merk at komponenten her wrappes i en `<main>` når de testes individuelt. Dette er for å tilfredstille UU-kravet om at alt sideinnhold må ligge under et "[landmark](https://www.w3.org/TR/wai-aria-practices-1.1/examples/landmarks/index.html)" ([`axe-core` regel](https://github.com/dequelabs/axe-core/blob/master/lib/rules/region.json) og [forklaring](https://dequeuniversity.com/rules/axe/4.1/region?application=RuleDescription)).

### Ende-til-ende-testing med [Cypress Axe](https://www.npmjs.com/package/cypress-axe)



1. Installer:

	```bash
	npm i cypress cypress-axe --save-dev
	```

2. Opprett `cypress/tsconfig.json`:

	```json
	{
	  "compilerOptions": {
	    "target": "es5",
	    "lib": ["es5", "dom"],
	    "types": ["cypress", "cypress-axe"]
	  },
	  "include": ["**/*.ts"]
	}
	```

3. Legg til `import 'cypress-axe'` i bunnen av [`cypress/support/index.js`]((./cypress/support/index.js))

3. Eksempel på bruk ([`cypress/spec.ts`]((./cypress/spec.ts))):

	```typescript
	// cypress/spec.ts

	/// <reference path="../support/index.d.ts" />

	beforeEach(() => {
	  cy.visit('http://localhost:3000')
	  cy.injectAxe()
	});

	it('Has no detectable a11y violations on load', () => {
	  // Test the page at initial load
	  cy.checkA11y()
	});
	```

5. Kjør `npx cypress open` eller `npx cypress run`

## Repo-innstillinger

### Github actions / CI

Se [eksempel-oppsett for automatisk bygg](./.github/workflows/master.yml) på alle push og pull requester mot `master` branch.

### Beskytt master branch

[Skru på krav](https://help.github.com/en/github/administering-a-repository/enabling-required-status-checks) om at bygg må ha kjørt uten feil før endringer kan merges inn til master:

>![Screenshot av innstillinger](https://i.imgur.com/jfhxMS2.png)