// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// // import { AddCart, DelCart } from "../redux/action/index";
// import { NavLink, useParams } from "react-router-dom";
// // import Skeleton from "react-loading-skeleton";

// const Product = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState([]);
//   const [loading, setLoading] = useState(false);
// //   const [cartBtn, setCartBtn] = useState("Add to Cart");
//   const dispatch = useDispatch();
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
//       setLoading(true);
//       const response = await fetch(`https://fakestoreapi.com/products/${id}`);
//       setProduct(await response.json());
//       setLoading(false);
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
//             src={product.image}
//             alt={product.title}
//             height={400}
//             width={400}
//           />
//         </div>
//         <div className="col-md-6">
//           <h4 className="text-uppercase text-black-50"> {product.category}</h4>
//           <h1 className="display-5">{product.title}</h1>
//           <p className="lead fw-bolder">
//             Rating : {product.rating && product.rating.rate}
//             <i className="fa fa-star"></i>
//           </p>
//           <h3 className="display-6 fw-semibold my-4">$ {product.price}</h3>
//           <p className="lead ">{product.description}</p>
//           {/* <button
//             className="btn btn-outline-dark px-4 py-2"
//             onClick={() => handleCart(product)}
//           >
//             {cartBtn}
//           </button> */}
//           {/* <NavLink to="/cart" className="btn btn-outline-dark ms-4 px-3 py-2">
//             Go To Cart
//           </NavLink> */}
//         </div>
//       </>
//     );
//   };
//   return (
//     <div>
//       <div className="container py-5 ">
//         <div className="row py-5">
//           {/* {loading ? <Loading /> : <ShowProduct />} */}
//           <ShowProduct />
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Product;





import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductDisplay from './ProductDisplay';

const UserProductPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchProducts = async (page) => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:5000/api/v1/product?page=${page}`);
            const data = response.data;
            if (Array.isArray(data.products)) {
                setProducts(data.products);
                setTotalPages(data.totalPages);
            } else {
                throw new Error('Expected an array of products');
            }
            setLoading(false);
        } catch (error) {
            setError(error);
            console.error('Error fetching products:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage]);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div>
            <h2>Danh sách sản phẩm</h2>
            <ProductDisplay products={products} />

            <div className="pag1nat1on">
                <button onClick={prevPage} disabled={currentPage === 1}>&lt;</button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => setCurrentPage(index + 1)}
                        className={currentPage === index + 1 ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
                <button onClick={nextPage} disabled={currentPage === totalPages}>&gt;</button>
            </div>
        </div>
    );
};

export default UserProductPage;

