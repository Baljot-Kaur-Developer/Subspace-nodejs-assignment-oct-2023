import  express from "express";
import colors from "colors";
import searchBlog from "./middlewares/searchBlog.js";
import getData from "./middlewares/getData.js";
const app = express();
app.use(getData);
app.use(searchBlog);
const port = 8080;
app.listen(port, ()=> {
console.log(`Server is listening at port ${port}`.bgCyan.blue);
}
);

