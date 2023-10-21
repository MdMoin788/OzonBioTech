import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Product } from "../components/home/Product";
import { Loader } from "../components/Loader";
import { MetaData } from "../components/MetaData";
import { productCategories, toastOption } from "../constants/data";
import { SelectDropDown } from "../components/search/SelectDropDown";
import { getAllProducts } from "../store/actions/productActions";
import "../styles/search.less";

export const Search = () => {
  const location = useLocation()
  const [params] = useSearchParams();
  let queryParams = Object.fromEntries([...params]);
  // const [queryParams, setQueryParams] = useState(query)
  // console.log("queryParams", queryParams);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error } = useSelector((state) => state.products);
  console.log("product from search", products);
  const categories = productCategories;
  const notify = () =>
    toast.error("Internal Server Error Try Later", toastOption);
  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log("value", name, value, type);
    const newparams = { ...queryParams, [name]: value };
    // setQueryParams((query)=> Object.assign(query, {name:value}))
    // setQueryParams({...queryParams, [name]:value})
    navigate({
      pathname: location.pathname,
      search: `?${createSearchParams(newparams)}`,
    });
  };
  useEffect(
    () => {
      dispatch(getAllProducts(queryParams));
      if (error) {
        notify();
      }
      // console.log("searching");
      return () => {
        // queryParams = {}
      };
    }, // eslint-disable-next-line
    [
      dispatch,
      error,
      queryParams?.name,
      queryParams?.category,
    ]
  );

  return (
    <>
      <MetaData title={"Search Page"} />
      {loading ? (
        <Loader />
      ) : error ? (
        <ToastContainer />
      ) : (
        <div className="search">
          
          <div className="main">
            {queryParams.name && (
              <h3>
                Showing {products?.products?.length} Results for
                {`"${queryParams.name}"`}
              </h3>
            )}

            
            <div className="product-container">
              {products?.map((product) => (
                <Product product={product} key={product._id} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
