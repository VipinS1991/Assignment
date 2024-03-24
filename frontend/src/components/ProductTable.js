import React, { useEffect, useState } from 'react';

const ProductTable = () => {
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        
        const fetchData = async () => {
            try {
                const response = await fetch('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
                if(!response.ok){
                    throw new Error("Failed to fetch products")
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products', error);
            }
        }; 
        fetchData();
    }, []);

    return (
        <div>
            <div>
                <button onClick={handleSearch}>Search Transaction</button>
                <button onClick={handleSelectMonth}>Select Month</button>
            </div>
            <h2>Product Table</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Sold</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.title}</td>
                            <td>{product.description}</td>
                            <td>${product.price.toFixed(2)}</td>
                            <td>{product.category}</td>
                            <td>{product.sold}</td>
                            <td><img src={product.image} alt={product.title} style={{ width: '100px' }} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;
