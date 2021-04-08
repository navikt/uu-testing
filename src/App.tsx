import React from 'react';
import MyComponent from './MyComponent';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <main className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>My app</h1>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <MyComponent />
    </main>
  );
}

export default App;
