import React from "react";
import Button from '@material-ui/core/Button';

interface Props {
  history: any
}

const Home = (props: Props) => {
  return (
    <React.Fragment>
      <h1>Home page</h1>
      <form action="">
        Busca: <input type='text' />
      </form>
      <Button variant="contained" color="secondary" onClick={() => props.history.push('/busca')}>
        Categorias
      </Button>
    </React.Fragment>
  );
};

export default Home;
