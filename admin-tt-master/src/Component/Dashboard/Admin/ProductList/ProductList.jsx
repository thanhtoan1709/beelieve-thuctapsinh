import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [newProduct, setNewProduct] = useState({});
    const [editProduct, setEditProduct] = useState({});    
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage]);

    const fetchProducts = async (page = 1) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/v1/product?page=${page}`);
            setProducts(response.data.products);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleFileChange = (e, setProduct) => {
        setProduct(prevProduct => ({ ...prevProduct, imageProduct: e.target.files[0] }));
    };

    const handleCreateProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(newProduct).forEach(key => {
            formData.append(key, newProduct[key]);
        });
        try {
            await axios.post('http://localhost:5000/api/v1/product', formData);
            setIsAdding(false);
            fetchProducts();
        } catch (error) {
            console.error("Error creating product:", error);
        }
    };

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(editProduct).forEach(key => {
            formData.append(key, editProduct[key]);
        });
        try {
            await axios.put(`http://localhost:5000/api/v1/product/update/?id_pr=${editProduct.id_pr}`, formData);
            setIsEditing(false);
            fetchProducts(currentPage);
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const handleEditProduct = (product) => {
        setEditProduct(product);
        setIsEditing(true);
    };

    const handleDeleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/v1/product/?id_pr=${id}`);
            fetchProducts(currentPage);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <h2>Danh sách sản phẩm</h2>
            <button onClick={() => setIsAdding(true)}>Thêm sản phẩm</button>            
            {isAdding && (                
                <div>
                    <h3>Thêm sản phẩm mới</h3>
                    <form onSubmit={handleCreateProduct}>
                        <input
                            type="text"
                            placeholder="ID"
                            onChange={(e) => setNewProduct({ ...newProduct, id_pr: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Tên sản phẩm"
                            onChange={(e) => setNewProduct({ ...newProduct, productName: e.target.value })}
                        />
                        <select
                            onChange={(e) => setNewProduct({ ...newProduct, code_cat: e.target.value })}
                        >
                            <option value="">Category</option>
                            <option value="Top">Top</option>
                            <option value="Bottom">Bottom</option>
                            <option value="Outerwear">Outerwear</option>
                            <option value="Handbag">Handbag</option>
                        </select>
                        <select
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
                        </select>
                        <select
                            onChange={(e) => setNewProduct({ ...newProduct, goWhere: e.target.value })}
                        >
                            <option value="">Chọn nơi đi</option>
                            <option value="Văn phòng">Văn phòng</option>
                            <option value="Thường ngày">Thường ngày</option>
                            <option value="Tiệc">Tiệc</option>
                            <option value="Thể thao">Thể thao</option>
                            <option value="Hẹn hò">Hẹn hò</option>
                        </select>
                        <select
                            onChange={(e) => setNewProduct({ ...newProduct, styleFilter: e.target.value })}
                        >
                            <option value="">Chọn Style</option>
                            <option value="Hiện đại">Hiện đại</option>
                            <option value="Đơn giản">Đơn giản</option>
                            <option value="Street Style">Street Style</option>
                            <option value="Năng động">Năng động</option>
                            <option value="Công sở">Công sở</option>
                        </select>
                        <select
                            onChange={(e) => setNewProduct({ ...newProduct, eventFilter: e.target.value })}
                        >
                            <option value="">Chọn Event</option>
                            <option value="Trường học">Trường học</option>
                            <option value="Du lịch">Du lịch</option>
                            <option value="Đi chơi">Đi chơi</option>
                        </select>
                        <div>
                        {newProduct.imageProduct ? (
                                    <img src={newProduct.imageProduct} alt={newProduct.productName} width="50" />
                                ) : (
                                    "Hình Ảnh"
                                )}
                        <input type="file" onChange={(e) => handleFileChange(e, setNewProduct)} />
                        </div>
                        <input
                            type="number"
                            placeholder="Giá"
                            onChange={(e) => setNewProduct({ ...newProduct, priceProduct: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Màu sắc"
                            onChange={(e) => setNewProduct({ ...newProduct, productColor: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Size"
                            onChange={(e) => setNewProduct({ ...newProduct, size: e.target.value })}
                        />
                        <input
                            type="number"
                            placeholder="Số lượng"
                            onChange={(e) => setNewProduct({ ...newProduct, soluong: e.target.value })}
                        />
                        
                        {/* <input type="file" onChange={(e) => handleFileChange(e, setNewProduct)} /> */}
                        <button type="submit">Thêm</button>
                        <button type="button" onClick={() => setIsAdding(false)}>Hủy</button>
                    </form>
                </div>
            )}
            {isEditing && (
                <div>
                    <h3>Chỉnh sửa sản phẩm</h3>
                    <form onSubmit={handleUpdateProduct}>
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
                            <option value="Công việc">Công việc</option>
                            <option value="Thường ngày">Thường ngày</option>
                            <option value="Tiệc">Tiệc</option>
                            <option value="Đi chơi">Đi chơi</option>
                            <option value="Thể thao">Thể thao</option>
                            <option value="Hẹn hò">Hẹn hò</option>
                            <option value="Du lịch">Du lịch</option>
                            <option value="Sự kiện đặc biệt">Sự kiện đặc biệt</option>
                            {/* Add other options as needed */}
                        </select>
                        
                        <select
                            value={editProduct.styleFilter}
                            onChange={(e) => setEditProduct({ ...editProduct, styleFilter: e.target.value })}
                        >
                            <option value="">Chọn Style</option>
                            <option value="Hiện đại">Hiện đại</option>
                            <option value="Cổ điển">Cổ điển</option>
                            <option value="Streetwear">Streetwear</option>
                            <option value="Romatic">Romatic</option>
                            <option value="Vintage">Vintage</option>
                            <option value="Boho">Boho</option>
                            <option value="Thanh lịch">Thanh lịch</option>
                            <option value="Năng động">Năng động</option>
                            {/* Add other options as needed */}
                        </select>
                        
                        <select
                            value={editProduct.eventFilter}
                            onChange={(e) => setEditProduct({ ...editProduct, eventFilter: e.target.value })}
                        >
                            <option value="">Chọn sự kiện</option>
                            <option value="Valentine">Valentine</option>
                            <option value="Halloween">Halloween</option>                            
                            <option value="Tết">Tết</option>
                            <option value="Lễ hội">Lễ hội</option>
                            {/* Add other options as needed */}
                        </select>                        
                        
                        
                        <div>
                        {editProduct.imageProduct ? (
                                    <img src={editProduct.imageProduct} alt={editProduct.productName} width="50" />
                                ) : (
                                    "No image"
                                )}
                        <input type="file" onChange={(e) => handleFileChange(e, setEditProduct)} />
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
                        {/* <input type="file" onChange={(e) => handleFileChange(e, setEditProduct)} /> */}
                        <button type="submit">Cập nhật</button>
                        <button type="button" onClick={() => setIsEditing(false)}>Hủy</button>
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
                                    <img src={product.imageProduct} alt={product.productName} width="100" />
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
            <div className="pagination"> {currentPage > 1 && ( <button key="prev" onClick={() => paginate(currentPage - 1)} className="prev" > Prev </button> )} {Array.from({ length: totalPages }, (_, index) => ( <button key={index + 1} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? 'active' : ''} > {index + 1} </button> ))} {currentPage < totalPages && ( <button key="next" onClick={() => paginate(currentPage + 1)} className="next" > Next </button> )} </div>
        
        </div>
    );
};

export default ProductList;
