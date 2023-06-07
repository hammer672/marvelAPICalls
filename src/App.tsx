import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import SearchBar from './SearchBar';

const data = [
  {
    id: 1,
    name: 'Spiderman',
    description: 'Spiderman est un héros de Marvel',
  }
]

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyleft '}
      <Link color="inherit" href="./">
        Marvel Search 🄯
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}



function Page() {
  return (
    <>
    <div className="container">
      <div className="item">
        <article>
          <div className="itemImg">
          </div>
          <div className="itemContent">
            <h1>{data[0].name}</h1>
            <p>Spiderman est un héros de Marvel</p>
          </div>
        </article>
      </div>
      <div className="item">
        <article>
          <div className="itemImg">
          </div>
          <div className="itemContent">
            <h1>Spiderman</h1>
            <p>Spiderman est un héros de Marvel</p>
          </div>
        </article>
      </div>
      <div className="item">
        <article>
          <div className="itemImg">
          </div>
          <div className="itemContent">
            <h1>Spiderman</h1>
            <p>Spiderman est un héros de Marvel</p>
          </div>
        </article>
      </div>
      <div className="item">
        <article>
          <div className="itemImg">
          </div>
          <div className="itemContent">
            <h1>Spiderman</h1>
            <p>Spiderman est un héros de Marvel</p>
          </div>
        </article>
      </div>
      <div className="item">
        <article>
          <div className="itemImg">
          </div>
          <div className="itemContent">
            <h1>Spiderman</h1>
            <p>Spiderman est un héros de Marvel</p>
          </div>
        </article>
      </div>
    </div>
    </>
  );
}

export default function App() {
  return (
    <>
      <SearchBar />
      <Page />
      <Copyright />
    </>
  );
}
