import React from 'react';
import Button from '@material-ui/core/Button';
import Topbar from '../../components/topbar';

interface Props {
  history: any;
}

const Home = (props: Props) => {
  const { history } = props;
  return (
    <React.Fragment>
      <Topbar history={history} />
      <h1>Home page</h1>
      <form action="">
        Busca: <input type="text" />
      </form>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => props.history.push('/busca')}
      >
        Categorias
      </Button>
    </React.Fragment>
  );
};

export default Home;
