import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default function Navigation({ loggedIn, handleLogout, userInfo })
{
  return (
    <Navbar bg='light' expand='lg' collapseOnSelect={true}>
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>FitKick</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav' className='justify-content-end'>
          <Nav className='me-auto'>
            <LinkContainer to='/'>
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/workouts'>
              <Nav.Link>Workouts</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/exercises'>
              <Nav.Link>Exercises</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            {userInfo && (
              <Navbar.Text className='justify-content-end'>
                You are signed in as: {userInfo.username}
              </Navbar.Text>
            )}
            {loggedIn ? (
              <>
                <LinkContainer to='/'>
                  <Nav.Link onClick={handleLogout}>Log Out</Nav.Link>
                </LinkContainer>
              </>
            ) : (
              <>
                <LinkContainer to='/signup'>
                  <Nav.Link>Sign Up</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/login'>
                  <Nav.Link>Log In</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}