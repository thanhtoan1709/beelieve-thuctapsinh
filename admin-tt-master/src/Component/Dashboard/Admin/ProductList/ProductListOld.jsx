import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import AdminSideBar from '../AdminSidebar/AdminSidebar';
import ReactPaginate from 'react-paginate';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [newProduct, setNewProduct] = useState({
        id_pr:"",
        productName: "",
        sub_cat: "",
        goWhere: "",
        styleFilter: "",
        eventFilter: "",        
        // pricesaleProduct: "",
        priceProduct: "",
        // descriptionProduct: "",
        productColor: "",
        size: "",
        soluong: ""
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editProduct, setEditProduct] = useState(null);    
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
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

        fetchProducts(currentPage);
    }, [currentPage]);
    

    const handleAddProduct = async () => {
        const formData = new FormData();
        for (let key in newProduct) {
            formData.append(key, newProduct[key]);
        }

        try {
            const response = await axios.post('http://localhost:5000/api/v1/product/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setProducts([...products, response.data]);
            setIsAdding(false);
            setNewProduct({
                id_pr: "",
                productName: "",
                cat_code: "",
                sub_cat: "",
                goWhere: "",
                styleFilter: "",
                eventFilter: "",            
                // pricesaleProduct: "",
                priceProduct: "",
                // descriptionProduct: "",
                productColor: "",
                size: "",
                soluong: ""
            });            
        } catch (error) {
            console.error("There was an error adding the product!", error);
        }
    };

    const handleFileChange = (e, setProduct) => {
        const file = e.target.files[0];
        setProduct(prevState => ({
            ...prevState,
            imageProduct: file
        }));
    };


    const handleEditProduct = (product) => {
        setIsEditing(true);
        setEditProduct(product);
    };   

    const handleUpdateProduct = async () => {
        const formData = new FormData();
        for (let key in editProduct) {
            formData.append(key, editProduct[key]);
        }

        try {
            await axios.put(`http://localhost:5000/api/v1/product/update/?id_pr=${editProduct.id_pr}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setProducts(products.map(product => product.id_pr === editProduct.id_pr ? editProduct : product));
            setIsEditing(false);
            setEditProduct(null);
        } catch (error) {
            console.error("There was an error updating the product!", error);
        }
    };

    const handleDeleteProduct = async (id_pr) => {
        try {
            await axios.delete(`http://localhost:5000/api/v1/product/?id_pr=${id_pr}`);
            setProducts(products.filter(product => product.id_pr !== id_pr));
        } catch (error) {
            console.error("There was an error deleting the product!", error);
        }
    };    

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div>
            <h2>Danh sách sản phẩm</h2>
            <button onClick={() => setIsAdding(true)}>Thêm sản phẩm</button>
            
            {isAdding && (
                <div>
                    <h3>Thêm sản phẩm mới</h3>
                    <form onSubmit={(e) => { e.preventDefault(); handleAddProduct(); }}>
                        <input
                            type="text"
                            placeholder="ID"
                            value={newProduct.id_pr}
                            onChange={(e) => setNewProduct({ ...newProduct, id_pr: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Tên sản phẩm"
                            value={newProduct.productName}
                            onChange={(e) => setNewProduct({ ...newProduct, productName: e.target.value })}
                        />
                        <select
                            value={newProduct.code_cat}
                            onChange={(e) => setNewProduct({ ...newProduct, code_cat: e.target.value })}
                        >
                            <option value="">Category</option>
                            <option value="Top">Top</option>
                            <option value="Bottom">Bottom</option>                            
                            <option value="Outerwear">Outerwear</option>                            
                            <option value="Handbag">Handbag</option>                            
                            {/* Add other options as needed */}
                        </select>
                        <select
                            value={newProduct.sub_cat}
                            onChange={(e) => setNewProduct({ ...newProduct, sub_cat: e.target.value })}
                        >
                            <option value="">Sub Category</option>
                            <option value="T-shirt">T-shirt</option>
                            <option value="Jersey">Jersey</option>
                            <option value="Shirt">Shirt</option>
                            <option value="Hoodie">Hoodie</option>
                            <option value="Crop hoodie">Crop hoodie</option>
                            <option value="Short">Short</option>
                            <option value="Pant">Pant</option>
                            <option value="Gi-lê">Gi-lê</option>
                            <option value="Thrift Bag">Thrift Bag</option>
                            <option value="Jacket & Coat">Jacket & Coat</option>
                            <option value="Wide Leg pants">Wide Leg pants</option>
                            {/* Add other options as needed */}
                        </select>
                        
                         <select
                            value={newProduct.goWhere}
                            onChange={(e) => setNewProduct({ ...newProduct, goWhere: e.target.value })}
                        >
                            <option value="">Chọn nơi đi</option>
                            <option value="Văn phòng">Văn phòng</option>
                            <option value="Thường ngày">Thường ngày</option>
                            <option value="Tiệc">Tiệc</option>
                            <option value="Thể thao">Thể thao</option>
                            <option value="Hẹn hò">Hẹn hò</option>
                            {/* Add other options as needed */}
                        </select>
                        
                        <select
                            value={newProduct.styleFilter}
                            onChange={(e) => setNewProduct({ ...newProduct, styleFilter: e.target.value })}
                        >
                            <option value="">Chọn Style</option>
                            <option value="Hiện đại">Hiện đại</option>
                            <option value="Cổ điển">Cổ điển</option>
                            <option value="Đường phố">Đường phố</option>
                            <option value="Thanh lịch">Thanh lịch</option>
                            <option value="Năng động">Năng động</option>
                            {/* Add other options as needed */}
                        </select>
                        
                         <select
                            value={newProduct.eventFilter}
                            onChange={(e) => setNewProduct({ ...newProduct, eventFilter: e.target.value })}
                        >
                            <option value="">Chọn sự kiện</option>
                            <option value="Đám cưới">Đám cưới</option>
                            <option value="Họp mặt">Họp mặt</option>
                            <option value="Du lịch">Du lịch</option>
                            <option value="Tết">Tết</option>
                            <option value="Lễ hội">Lễ hội</option>
                            {/* Add other options as needed */}
                        </select>
                        
                       
                        <div>Hình ảnh
                        <input
                            type="file"
                            placeholder="Hình"
                            value={newProduct.imageProduct}
                            onChange={(e) => setNewProduct({ ...newProduct, imageProduct: e.target.value })}
                        />
                        </div>
                        <input
                            type="text"
                            placeholder="Giá gốc"
                            value={newProduct.priceProduct}
                            onChange={(e) => setNewProduct({ ...newProduct, priceProduct: e.target.value })}
                        />
                        
                        
                        <input
                            type="text"
                            placeholder="Màu"
                            value={newProduct.productColor}
                            onChange={(e) => setNewProduct({ ...newProduct, productColor: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Size"
                            value={newProduct.size}
                            onChange={(e) => setNewProduct({ ...newProduct, size: e.target.value })}
                        />
                        <input
                            type="number"
                            placeholder="Số lượng"
                            value={newProduct.soluong}
                            onChange={(e) => setNewProduct({ ...newProduct, soluong: e.target.value })}
                        />
                        {/* Add other input fields similar to above for each product attribute */}
                        <button type="submit">Lưu</button>
                        <button onClick={() => setIsAdding(false)}>Hủy</button>
                    </form>
                </div>
            )}

            {isEditing && (
                <div>
                    <h3>Chỉnh sửa sản phẩm</h3>
                    <form onSubmit={(e) => { e.preventDefault(); handleUpdateProduct(); }}>
                    <input
                            type="text"
                            placeholder="ID"
                            value={editProduct.id_pr}
                            onChange={(e) => setEditProduct({ ...editProduct, id_pr: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Tên sản phẩm"
                            value={editProduct.productName}
                            onChange={(e) => setEditProduct({ ...editProduct, productName: e.target.value })}
                        />
                        <select
                            value={editProduct.code_cat}
                            onChange={(e) => setEditProduct({ ...editProduct, code_cat: e.target.value })}
                        >
                            <option value="">Category</option>
                            <option value="Top">Top</option>
                            <option value="Bottom">Bottom</option>                            
                            <option value="Outerwear">Outerwear</option>                            
                            <option value="Handbag">Handbag</option>                            
                            {/* Add other options as needed */}
                        </select>
                        <select
                            value={editProduct.sub_cat}
                            onChange={(e) => setEditProduct({ ...editProduct, sub_cat: e.target.value })}
                        >
                            <option value="">Sub Category</option>
                            <option value="T-shirt">T-shirt</option>
                            <option value="Jersey">Jersey</option>
                            <option value="Shirt">Shirt</option>
                            <option value="Hoodie">Hoodie</option>
                            <option value="Crop hoodie">Crop hoodie</option>
                            <option value="Short">Short</option>
                            <option value="Pant">Pant</option>
                            <option value="Gi-lê">Gi-lê</option>
                            <option value="Thrift Bag">Thrift Bag</option>
                            <option value="Jacket & Coat">Jacket & Coat</option>
                            <option value="Wide Leg pants">Wide Leg pants</option>
                            {/* Add other options as needed */}
                        </select>
                        
                         <select
                            value={editProduct.goWhere}
                            onChange={(e) => setEditProduct({ ...editProduct, goWhere: e.target.value })}
                        >
                           <option value="">Chọn nơi đi</option>
                            <option value="Văn phòng">Văn phòng</option>
                            <option value="Thường ngày">Thường ngày</option>
                            <option value="Tiệc">Tiệc</option>
                            <option value="Thể thao">Thể thao</option>
                            <option value="Hẹn hò">Hẹn hò</option>
                            {/* Add other options as needed */}
                        </select>
                        
                        <select
                            value={editProduct.styleFilter}
                            onChange={(e) => setEditProduct({ ...editProduct, styleFilter: e.target.value })}
                        >
                            <option value="">Chọn Style</option>
                            <option value="Hiện đại">Hiện đại</option>
                            <option value="Cổ điển">Cổ điển</option>
                            <option value="Đường phố">Đường phố</option>
                            <option value="Thanh lịch">Thanh lịch</option>
                            <option value="Năng động">Năng động</option>
                            {/* Add other options as needed */}
                        </select>
                        
                        <select
                            value={editProduct.eventFilter}
                            onChange={(e) => setEditProduct({ ...editProduct, eventFilter: e.target.value })}
                        >
                            <option value="">Chọn sự kiện</option>
                            <option value="Đám cưới">Đám cưới</option>
                            <option value="Họp mặt">Họp mặt</option>
                            <option value="Du lịch">Du lịch</option>
                            <option value="Tết">Tết</option>
                            <option value="Lễ hội">Lễ hội</option>
                            {/* Add other options as needed */}
                        </select>                        
                        
                        
                        <div><img src={editProduct.imageProduct} alt={editProduct.productName} width="50" />
                        <input
                            type="file"                            
                            onChange={(e) => handleFileChange(e, setNewProduct)}
                        />
                        </div>
                        <input
                            type="text"
                            placeholder="Giá"
                            value={editProduct.priceProduct}
                            onChange={(e) => setEditProduct({ ...editProduct, priceProduct: e.target.value })}
                        />                        
                        
                        
                        <input
                            type="text"
                            placeholder="Màu"
                            value={editProduct.productColor}
                            onChange={(e) => setEditProduct({ ...editProduct, productColor: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Size"
                            value={editProduct.size}
                            onChange={(e) => setEditProduct({ ...editProduct, size: e.target.value })}
                        />
                        <input
                            type="number"
                            placeholder="Số lượng"
                            value={editProduct.soluong}
                            onChange={(e) => setEditProduct({ ...editProduct, soluong: e.target.value })}
                        />
                        {/* Add other input fields similar to above for each product attribute */}
                        <button type="submit">Lưu</button>
                        <button onClick={() => setIsEditing(false)}>Hủy</button>
                    </form>
                </div>
            )}

            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Category</th>
                        <th>Sub Category</th>
                        <th>Đi đâu</th>
                        <th>Style</th>
                        <th>Event</th>
                        <th>Hình ảnh</th>
                        {/* <th>Giá giảm</th> */}
                        <th>Giá</th>
                        {/* <th>Mô tả</th> */}
                        <th>Màu</th>
                        <th>Size</th>
                        <th>Số lượng</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id_pr}>
                            <td>{product.id_pr}</td>
                            <td>{product.productName}</td>
                            <td>{product.code_cat}</td>
                            <td>{product.sub_cat}</td>
                            <td>{product.goWhere}</td>
                            <td>{product.styleFilter}</td>
                            <td>{product.eventFilter}</td>
                            {/* <td>{product.imageProduct}</td> */}
                            <td>{product.imageProduct ? (
                                    <img src={`http://localhost:5000/${product.imageProduct}`} alt={product.productName} width="100" />
                                ) : (
                                    "No image"
                                )}</td>
                            {/* <td>{product.pricesaleProduct}</td> */}
                            <td>{product.priceProduct}</td>
                            {/* <td>{product.descriptionProduct}</td> */}
                            <td>{product.productColor}</td>
                            <td>{product.size}</td>
                            <td>{product.soluong}</td>
                            <td>
                                <button onClick={() => handleEditProduct(product)}>Sửa</button>
                                <button onClick={() => handleDeleteProduct(product.id_pr)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={currentPage === index + 1 ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
