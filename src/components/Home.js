import React from 'react';
import { Container, Image } from 'react-bootstrap';

export default function Home({ loggedIn, userInfo })
{
  console.log(userInfo);
  if (!loggedIn)
  {
    return (
      <Container className='p-5 border rounded-3 bg-light'>
        <h1>FitKick</h1>
        <h4>Your sidekick to being fit!</h4>
        <Image
          rounded
          fluid
          src='https://cdn.pixabay.com/photo/2021/01/04/06/20/man-5886570_960_720.jpg'
        />
      </Container>
    )
  }
  return (
    <Container className='p-5 border rounded-3 bg-light'>
      <h1>{userInfo.username}</h1>

    </Container>
  );
}