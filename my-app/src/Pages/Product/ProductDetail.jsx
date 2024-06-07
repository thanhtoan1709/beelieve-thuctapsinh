// import React, { useState, useEffect } from "react";
// // import { useSelector, useDispatch } from "react-redux";
// // import { AddCart, DelCart } from "../redux/action/index";
// import { NavLink, useParams } from "react-router-dom";
// // import Skeleton from "react-loading-skeleton";

// const Product = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [cartBtn, setCartBtn] = useState("Add to Cart");
// //   const dispatch = useDispatch();
// //   const handleCart = (product) => {
// //     if (cartBtn === "Add to Cart") {
// //       dispatch(AddCart(product));
// //       setCartBtn("Remove from Cart");
// //     } else {
// //       dispatch(DelCart(product));
// //       setCartBtn("Add to Cart");
// //     }
// //   };
//   // const addProduct = (product) => {
//   //   dispatch(AddCart(product));
//   // };

//   useEffect(() => {
//     const getProduct = async () => {
//       // setLoading(true);
//       const response = await fetch(`http://localhost:5000/api/v1/product/${id}`);
//       setProduct(await response.json());      
//       // setLoading(false);
//     };
//     getProduct();

//     return () => {};
//   }, []);
// //   const Loading = () => {
// //     return (
// //       <>
// //         <div className="col-md-6">
// //           <Skeleton height={400} />
// //         </div>
// //         <div className="col-md-6" style={{ lineHeight: 2 }}>
// //           <Skeleton height={50} width={300} />
// //           <Skeleton height={75} />
// //           <Skeleton height={25} width={100} />
// //           <Skeleton height={50} />
// //           <Skeleton height={150} />
// //           <Skeleton height={50} />
// //         </div>
// //       </>
// //     );
// //   };
//   const ShowProduct = () => {
//     return (
//       <>
//         <div className="col-md-6">
//           <img
//             src={product.imageProduct}
//             alt={product.productName}
//             height={400}
//             width={400}
//           />
//         </div>
//         <div className="col-md-6">
//           <h4 className="text-uppercase text-black-50"> {product.code_cat}</h4>
//           <h1 className="display-5">{product.productName}</h1>
//           <p className="lead fw-bolder">
//             Rating : {product.rating && product.rating.rate}
//             <i className="fa fa-star"></i>
//           </p>
//           <h3 className="display-6 fw-semibold my-4">$ {product.priceProduct}</h3>
//           <p className="lead ">{product.descriptionProduct}</p>
//           {/* <button
//             className="btn btn-outline-dark px-4 py-2"
//             onClick={() => handleCart(product)}
//           >
//             {cartBtn}
//           </button> */}
//           <NavLink to="/" className="btn btn-outline-dark ms-4 px-3 py-2">
//             Back to home
//           </NavLink>
//         </div>
//       </>
//     );
//   };
//   return (
//     <div>
//       <div className="container py-5 ">
//         <div className="row py-5">
//           <ShowProduct />
//           {/* {loading ? <Loading /> : <ShowProduct />} */}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Product;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css'
import { Link } from 'react-router-dom';
import Sidebar from '../../Components/SideBar/SideBar';
import WeatherForecast from '../../Components/WeatherForecast/WeatherForecast';

const ProductDetail = () => {
  const { id_pr } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Giả sử chúng ta có một API để lấy thông tin sản phẩm dựa vào productId
    fetch(`http://localhost:5000/api/v1/product/${id_pr}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data.product);                
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [id_pr]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container-fluid">            
      <div className="row">
          {/* <!-- Sidebar Column --> */}
          <div className="col-2">
          <div className=" p-0 " >
              {/* <!-- Sidebar Content Here --> */}
              <Sidebar />
          </div>
          </div>
          {/* <!-- Products Column --> */}
          <div className="col-10">
          <div className=" p-0">
              {/* <!-- Sidebar Content Here --> */}
              <WeatherForecast />
          </div>
          <div className=" p-1">
              {/* <!-- Products Content Here --> */}
            <div className="product-detail">
              <div className="product-detail__image">
                <img src={product.imageProduct} alt={product.productName} />
              </div>
              <div className="product-detail__info">
                <h1>{product.productName}</h1>
                <p>{product.descriptionProduct}</p>
                <p className="product-detail__price">{product.priceProduct} VNĐ</p>
                <Link to={"/"}>
                <button >Back</button>
                </Link>                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );

  
};

export default ProductDetail;
