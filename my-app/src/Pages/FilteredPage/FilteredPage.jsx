import { useLocation } from 'react-router-dom';
import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from '../../Components/SideBar/SideBar';
import WeatherForecast from '../../Components/WeatherForecast/WeatherForecast';
import './FilteredPage.css'
import { Link } from 'react-router-dom';

const FilteredPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const searchTerm = params.get('searchTerm');
  const selectedCategory = params.get('selectedCategory');
  const selectedStyle = params.get('selectedStyle');
  const selectedEvent = params.get('selectedEvent');
  const selectedColor = params.get('selectedColor');

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const allProducts = [];
      let currentPage = 1;
      let fetchedAllPages = false;

      while (!fetchedAllPages) {
        const response = await axios.get(`http://localhost:5000/api/v1/product?page=${currentPage}`);
        const data = response.data;

        console.log('Fetched data:', data); // Log the fetched data

        if (Array.isArray(data.products)) {
          allProducts.push(...data.products);
        } else {
          throw new Error('Expected an array of products');
        }

        if (currentPage >= data.totalPages) {
          fetchedAllPages = true;
        } else {
          currentPage += 1;
        }
      }

      setProducts(allProducts);
      setTotalPages(currentPage);
      setLoading(false);
    } catch (error) {
      setError(error);
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    return (
      (!selectedCategory || product.goWhere === selectedCategory) &&
      (!selectedStyle || product.styleFilter === selectedStyle) &&
      (!selectedEvent || product.eventFilter === selectedEvent) &&
      (!selectedColor || product.productColor === selectedColor) &&
      (!searchTerm || product.productName.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  console.log('Filtered products:', filteredProducts); // Log the filtered products

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
                <div className=" p-0">
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
                  <div className="filtered-page">
                  <h1>Kết quả đã lọc</h1>
                  <div className="product-grid">
                        {filteredProducts.map(product => (
                            <div className="product-card" key={product.id_pr}>
                                <img
                                    src={product.imageProduct}
                                    alt={product.productName}
                                    className="product-image"
                                />
                                <div className="product-info">
                                    <h3 className="product-name">{product.productName}</h3>
                                    <p className="product-price">
                                        Giá: {product.priceProduct} VND
                                        {/* {product.pricesaleProduct && (
                                            <span className="product-sale-price"> {product.pricesaleProduct} VND</span>
                                        )} */}
                                    </p>
                                    {/* <p className="product-description">{product.descriptionProduct}</p> */}
                                    <Link to={`/product/${product.id_pr}`}>
                                    <button className="product-button">Xem chi tiết</button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>                
                </div>
                </div>
            </div>
            </div>

  );
};

export default FilteredPage;
