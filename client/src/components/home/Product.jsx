import React from "react";
import { Link } from "react-router-dom";
import "../../styles/home/product.less";
export const Product = ({ product, from }) => {
  return (
    <Link className="product" to={`/product/${product?._id}`}>
      <img
        className="product-img"
        src={product?.img}
        alt={product?.title}
      />
      <div className="title-price-cont">
        <h3 className="product-name">{product?.title}</h3>
        <>
          {
            from == "home" ?  <p className="product-desc"><ShorData short={product?.description} /></p> :
              <>
                <p className="product-name">{product?.description}</p>
              </>
          }
         
        </>
      </div>
    </Link>
  );
};

const ShorData = ({ short }) => {
  let str = short.slice(0, 73)
  return <>
    {
      str
    }
    {
      "....."
    }
  </>
}