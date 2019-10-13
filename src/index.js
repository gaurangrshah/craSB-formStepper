import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Container } from 'react-bootstrap';

import Layout from './components/layout';
// import SandboxForm from './components/SandboxForm';
import FormComp from './components/FormComp';
import './styles/style.scss';

function App() {
  return (
    <Layout pageInfo={{ pageName: 'index' }}>
      <Container className="text-center">
        <Row className="counter-holder justify-content-center my-3">
          {/* <SandboxForm /> */}
          <FormComp />
        </Row>
      </Container>
    </Layout>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
