import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchHeader from '../../Components/Header/SearchHeader';
import ProductCard from '../../Components/Cardview/ProductCard';
import './style.css';
import { useLocation } from 'react-router-dom';
import { useAlert } from 'react-alert';

const CategoryPage = (props) => {
    let location = useLocation();
    const alert = useAlert();

    const [Products, setData] = useState([]);
    const [filter, setFilter] = useState([]);

    useEffect(() => {
        const fetch = () => {
            axios
                .get('https://rentingsystem.herokuapp.com/product/')
                .then((response) => {
                    const data = response.data;
                    if (data.error) {
                        alert.error(data.msg);
                        setData([]);
                    } else {
                        setData(
                            response.data.product.filter((product) => {
                                return product.category === location.state;
                            })
                        );
                        setFilter(
                            response.data.product.filter((product) => {
                                return product.category === location.state;
                            })
                        );
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        };

        fetch();
    }, [alert, location.state]);

    const handleInputChanges = (event) => {
        setFilter(
            Products.filter((product) => {
                return (
                    product.title
                        .toLowerCase()
                        .indexOf(event.target.value.toLowerCase()) !== -1
                );
            })
        );
    };

    return (
        <div className='Dashboard'>
            <SearchHeader handleChange={handleInputChanges} />
            <div className='Main-card'>
                {filter.map((product) => {
                    return <ProductCard key={product._id} product={product} />;
                })}
            </div>
        </div>
    );
};

export default CategoryPage;
