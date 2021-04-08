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