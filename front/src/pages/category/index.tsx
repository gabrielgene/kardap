import React from 'react';
import Topbar from '../../components/topbar';

interface Props {
  name: string;
  history: any;
}

const Category = (props: Props) => {
  console.log(props);
  return (
    <React.Fragment>
      <Topbar back history={props.history}/>
      <h1>Categoria</h1>
    </React.Fragment>
  );
};

export default Category;
