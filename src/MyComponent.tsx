import React from 'react';

const MyComponent = ({ greeting = 'Hello' }) => (
	<div>{`${greeting} from MyComponent`}</div>
);

export default MyComponent;