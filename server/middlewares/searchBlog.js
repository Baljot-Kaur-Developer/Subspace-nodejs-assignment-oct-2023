import express from "express";
import fetch from "node-fetch";
import _ from "lodash";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const searchBlog = app.get('/api/blog-search', async (req, res) =>
{
    const key1 = req.query.title || req.query.id;
  
  try {
    const  data1 =  await fetch(process.env.URL
    ,{
        method: 'GET',
        headers : {
            'X-Hasura-Admin-Secret' : process.env.SECRET_KEY,
             'Connection' : 'keep-alive',
        },
       });
       const jsonData = await data1.json();
       
const filterData = _.filter(jsonData.blogs, (data) => { 
    if(_.includes(data.title , key1) ||_.includes(data.id , key1))
    return data;
});

    if(filterData.length > 0){
       return res.status(200).json(filterData);
    }
    else throw error;
}catch (error){
    return res.status(404).json({
        message : "No Record  found !!"
    })
}
});

export default searchBlog;