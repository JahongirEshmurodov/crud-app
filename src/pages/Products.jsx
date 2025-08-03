import React, { useState } from 'react'
import ProductLists from './ProductLists';
import ProductForm from './productForm';



function Products() {
    const [content, setcontent] = useState(<ProductLists showForm={showForm} />)

    function showList() {
        setcontent(<ProductLists showForm={showForm} />);
    }
    function showForm(product) {
        setcontent(<ProductForm product={product} showList={showList} />);
    }


  return (
    <div className='container my-5'>
       {content}
    </div>
  )
}

export default Products