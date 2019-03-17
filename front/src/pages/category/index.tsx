import React from 'react';
import Topbar from '../../components/topbar';

interface Props {
  name: string;
}

const Category = (props: Props) => {
  console.log(props);
  return (
    <React.Fragment>
      <Topbar/>
      <h1>Categoria</h1>
    </React.Fragment>
  );
};

// const Category = () => {
//     const x = 2 + 3;
//     return <h1>{x}</h1>
// }

// function Category() {
//     return <h1>Categoria</h1>
// }

// class Category extends React.Component {
//     render() {
//         return <h1>Categoria</h1>
//     }
// }

export default Category;
