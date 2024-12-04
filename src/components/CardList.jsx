  import Card from './Card'
  import Button from './Button';
  import Search from './Search';
  import React, { useState, useEffect } from "react";


  const CardList = ({data}) => {

    const limit = 10;
    const defaultDataset = data.slice(0, limit);
    const [offset, setOffset] = useState(0);
    const [products, setProducts] = useState(defaultDataset);

    const handlePrevious = () => {

      setOffset(offset - limit);
    }
    const handleNext = () => {
      setOffset(offset + limit);
    }

    useEffect(() => {
      setProducts(data.slice(offset, offset + limit));
    }, [offset, limit, data]);

    const filterTags = (tagQuery) =>{
      const filtered = data.filter(product =>{
        if(!tagQuery){
          return product
        }
        return product.tags.find(({title}) => title === tagQuery)
      })

      setOffset(0)
      setProducts(filtered)
    }

    return (
      <div className="cf pa2">
        <div className="mt2 mb2">
          <Search handleSearch={filterTags}/>
          {products && products.map((product) => (
            <Card key={product.id} {...product} />
          ))}
        </div>
        <div className="flex items-center justify-center pa4">   
          <Button text="Previous" handleClick={()=> setOffset(offset, offset - limit)} />
          <Button text="Next" handleClick={()=> setOffset(offset, offset + limit)} />
        </div>
      </div>
    );
}

export default CardList;
