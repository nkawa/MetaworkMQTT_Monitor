"use client"

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar } from "react-bootstrap";
import Link from 'next/link';
import packageInfo from '../../package.json' assert { type: "json" };

export default (props) => {
  const ver = packageInfo.version
//  const ver = process.env.npm_package_version;
  return (
    <Navbar  bg="success" expand="md">
      <Container>
        <Navbar.Brand as="div">  <Link href="/" passHref>
        MetaworkMQTT Monitor {ver}   </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/list" passHref> <Nav.Link as="div" > Clients </Nav.Link></Link>
          </Nav>
          <Nav>
            <Nav.Link href="https://ucl.nuee.nagoya-u.ac.jp">
              {" "}
              UCLab HP{" "}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
