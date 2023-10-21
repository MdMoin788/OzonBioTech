import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Slider } from "../components/home/Slider";
import { Loader } from "../components/Loader";
import { clearAllError, getSingleProduct } from "../store/actions/productActions";
import "../styles/productDetail.less";
import { toast, ToastContainer } from "react-toastify";
import { MetaData } from "../components/MetaData";
import { toastOption } from "../constants/data";

export const ProductDetail = () => {
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state?.productDetail);
  const { id } = useParams();

  const [currentStr, setCurrentStr] = useState("features")

  useEffect(() => {
    dispatch(getSingleProduct(id));
    if (error) {

      toast.error(error, toastOption)
    }
    return () => {

    };
  }, [error, id, dispatch]);
  useEffect(() => {
    return () => {
      dispatch(clearAllError())
    }
  }, [dispatch])


  const openDataHere = (paramsss) => {
    setCurrentStr(paramsss)
  }

  return (
    error ? <ToastContainer /> : loading ? <Loader /> :
      <>
        <MetaData title={'Product Detail Page'} />
        <div className="product-detail">
          <div className="product-detail-top">
            <div className="product-detail-left">
              <Slider sliderImages={[{ url: product?.img }]} slideInterval={2000} />
            </div>
            <div className="product-detail-right">
              <div className="subscribe-cont">
                <h3>Name</h3>
                <p>{product?.name}</p>
              </div>
              <div className="subscribe-cont">
                <h3>Description</h3>
                <p>{product?.description}</p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus consequatur natus quo error, aut autem quod magni tempora rem incidunt debitis esse quis iste eaque qui explicabo odit nihil ab mollitia dolor. Porro, maiores numquam! Labore facilis recusandae aspernatur, aliquid rem id fugiat maiores neque voluptatem, alias minus magni aperiam consequuntur consectetur ipsam aut veritatis numquam sunt vero hic? Aut molestiae perspiciatis modi, quos vel temporibus. Nemo adipisci alias impedit asperiores sit labore sint ea. Repellendus deleniti quas vel harum repellat, aspernatur eum. Distinctio earum saepe illo velit labore animi itaque dignissimos error quasi vel soluta, quas ab possimus sapiente! Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident exercitationem tenetur consectetur nam sapiente delectus corrupti illum natus quod, voluptatem temporibus officia tempora eum voluptates aspernatur eligendi cum, alias aut dolores. Ab saepe sint illo accusantium quo recusandae suscipit mollitia necessitatibus, beatae rerum molestias quia, ipsam nemo. Commodi, explicabo numquam.
              </div>
            </div>
          </div>


          {/* bottom feature part   */}
          <h3>Recommandation for this product </h3>
          <div className="product-detail-bottom">

            <div style={{ width: "30%", display: "flex", justifyContent: "space-start", gap: "10px" }}>
              <button onClick={() => openDataHere("features")} style={{ cursor: "pointer", width: "fit-content", padding: "7px", borderRadius: "2px", backgroundColor: "#f36f21", border: "yellow" }}>Features</button>
              <button onClick={() => openDataHere("benefit")} style={{ cursor: "pointer", width: "fit-content", padding: "7px", borderRadius: "2px", backgroundColor: "yellow", border: "yellow" }}>Benefit</button>
              <button onClick={() => openDataHere("dosage_application")} style={{ cursor: "pointer", width: "fit-content", padding: "7px", borderRadius: "2px", backgroundColor: "yellow", border: "yellow" }}>Dosage And Application</button>
            </div>



            {product[currentStr]?.length ? (
              <div style={{ width: "100%", display: "flex ", flexDirection: "column" }}>
                {
                  currentStr == "dosage_application" ? <>

                    {
                      product[currentStr]?.map((ele) => {
                        return <>

                          <div style={{ width: "50%", marginBottom: "10px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "5px" }} >
                            <p>{ele?.name}</p>
                            <div style={{ width: "40%" }} >
                              <hr />
                            </div>
                            <p>{ele?.dose_size}</p>
                          </div>



                        </>
                      }
                      )
                    }


                  </> : <>
                    {
                      product[currentStr]?.map((ele) => {
                        return <>

                          <p>{ele}</p>
                          <br />

                        </>
                      }
                      )
                    }
                  </>
                }
              </div>
            ) : (
              <div className="no-reviews-cont">No Reviews For this product</div>
            )}
          </div>
        </div>
      </>
  );
};
