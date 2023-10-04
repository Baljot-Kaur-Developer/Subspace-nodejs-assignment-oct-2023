import express from "express";
import fetch from "node-fetch";
import _ from "lodash";
import dotenv from "dotenv";
const app = express();
dotenv.config();
// middleware to get the data .. ... ....
const getData = app.get('/api/blog-stats', async (req, res) =>
{
 
     // 1. **Data Retrieval**:
     try {
    const  data = await fetch(process.env.URL,{
    method: 'GET',
    headers : {
         'X-Hasura-Admin-Secret' : process.env.SECRET_KEY,
         'Connection' : 'keep-alive',
    },
   });
    // 2. **Data Analysis**:
  // 2.1 total length ............
  
   const jsonData = await data.json();
   if(!jsonData.blogs.length){
    throw error; 
   } else {
const blogArray = jsonData.blogs;
const totalBlogs = _.size(blogArray);
// 2.2  print the longest title blog .......
const lengthTitleBlogArray =  _.map(blogArray, (blogs) => _.size(blogs.title));
const MaxLengthOfTitle = _.max(lengthTitleBlogArray);
let TitleOfThelongestBlog = _.filter(blogArray, (blogs) =>
{
if(_.size(blogs.title) === MaxLengthOfTitle)
return blogs;
}).map(function(blogs) {
return blogs.title;
});
// 2.3 Number of blogs with "privacy" in the title....
const arrayWithPrivacyTitles = _.filter(blogArray, (blogs) =>
{

  if(_.includes(blogs.title , 'Privacy'))
  return blogs;
})
.map(function(blogs){
  return blogs.title;
});
const totalNoOfPrivacyTitleBlogs = _.size(arrayWithPrivacyTitles);

///2.4 An array of unique blog titles....

// total 429 blogs with unique title
const uniqueArrayOfBlogs =  _.uniqBy(blogArray, 'title');
return res.status(200).json({ "Total number of blogs ": totalBlogs , "The title of the longest blog " : TitleOfThelongestBlog,"Number of blogs with Privacy in the title "  : totalNoOfPrivacyTitleBlogs ,"An array of unique blog titles " : uniqueArrayOfBlogs});
}

} catch(error){
      return res.status(404).json({message : " No Data found !!"})
     }
   
});

    
export default getData;