import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "../components/home/Product";
import { Slider } from "../components/home/Slider";
import { Loader } from "../components/Loader";
import { MetaData } from "../components/MetaData";
import { getAllProducts } from "../store/actions/productActions";
import { toast, ToastContainer } from "react-toastify";
import "../styles/home/home.less";
import { homeSlider, toastOption } from "../constants/data";


export const Home = () => {
  const [homeSliderImages] = useState(homeSlider);
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);




  useEffect(() => {
    console.log("useEffect runs");
    dispatch(getAllProducts());
    if (error) {
      toast.error(error, toastOption);
    }
    return () => {
      // alert('hello')
    };
  }, [dispatch, error]);


  return (
    error ? <ToastContainer /> : loading ? <Loader /> :
      <Fragment>
        <MetaData title={"Home Page"} />
        <div className="home">
          <Slider sliderImages={homeSliderImages} slideInterval={3000} />
          <h2 style={{ textAlign: 'center', marginBottom: "10px", marginTop: "100px" }} >Our Products and Services</h2>
          <div style={{ width: "400px", textAlign: "center", margin: "auto" }} >   <hr /></div>

          <p style={{ textAlign: 'center', marginTop: "10px", marginBottom: "50px" }} >Samhle text or content goes here or Slogan</p>

          <div className="product-cont">
            {products.map((product) => (
              <Product product={product} key={product?._id} from="home" />
            ))}
          </div>
        </div>
      </Fragment>
  );
};
