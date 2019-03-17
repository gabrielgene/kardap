import React from 'react';

interface Props {
    name: string
};

const Category = (props: Props) => <h1>{props.name}</h1>

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

export default Category
