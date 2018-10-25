import React, { Component } from 'react';
import styled from 'styled-components';
import './app.css';

const Main = styled.div`
  margin: 40px auto;
  max-width: 650px;
  line-height: 1.6;
  font-size: 18px;
  color: #444;
  padding: 0 10px;
`;

class App extends Component {
  render() {
    return (
      <Main>
        <h1> Hello, world?</h1>
      </Main>
    );
  }
}

export default App;
