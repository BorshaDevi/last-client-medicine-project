import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import useSecret from '../../../Hook/useSecret';

const CategoryDetail = () => {
    const axiosSecret=useSecret()
    const {category}=useParams()
    const {data : detailCategory}=useQuery({
        queryKey:['detailCategory'],
        queryFn:async()=>{
            const res=await axiosSecret.get(`/detailCategory/${category}`)
            console.log('category working',detailCategory)
            return res.data
        }
    })
    return (
        <div>
            <h1>{detailCategory.length}</h1>
        </div>
    );
};

export default CategoryDetail;