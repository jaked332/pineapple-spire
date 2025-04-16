'use client';

import { signOut } from 'next-auth/react';
import { Button, Col, Row } from 'react-bootstrap';

/** After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const SignOut = () => (
  <Col id="signout-page" className="text-center py-3 mt-5">
    <h2>Are you sure you want to sign out?</h2>
    <Row>
      <Col xs={5} />
      <Col>
        <Button variant="danger" onClick={() => signOut({ callbackUrl: '/', redirect: true })}>
          Yes! Sign Out
        </Button>
      </Col>
      <Col>
        <Button variant="secondary" href="/">
          Cancel
        </Button>
      </Col>
      <Col xs={5} />
    </Row>
  </Col>
);

export default SignOut;
