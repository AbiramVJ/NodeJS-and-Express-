// we dont have databse that =s why is you js as a data base
//main back end code
const db = require("./database/index.js");
//const mongoose = require('mongoose');
const BookModel = require("./database/book");


// using express
//get API 
//====================================================================================
const express = require("express");
const { request } = require("express");
// const { get } = require("http");
const app = express();
app.use(express.json());//it passesd incoming request from the payload
//method 1

var mongoose = require("mongoose");
var mongoDB = "mongodb+srv://abiram:9ms0jjYTJGbLX8WY@cluster0.ff9hx.mongodb.net/book-company?retryWrites=true&w=majority";
mongoose.connect(mongoDB,{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>console.log("CONNECTED SUCCESFULLY"));

//method 2
//mangoDB connection
//========================================================================================
// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://abiram:9ms0jjYTJGbLX8WY@cluster0.ff9hx.mongodb.net/book-company?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const bcollection = client.db("book-company").collection("books").findOne({ISBN:"12345THREE"});
//   bcollection.then((data)=>console.log(data));
//   // perform actions on the collection object

  
// });

// method 3

// async function listDatabase(client){
//     databaseList = await client.db().admin().listDatabase();
//     console.log("the data base are");
//     databaseList.listDatabase.forEach(db=>console.log(db.name));
// }

// async function main(){

//     const uri = "mongodb+srv://abiram:9ms0jjYTJGbLX8WY@cluster0.ff9hx.mongodb.net/book-company?retryWrites=true&w=majority";
//     const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//     try{
//         await client.connect();
//         const result = await client.db("book-company").collection("books").findOne({ISBN:"12345THREE"});
//         console.log(result);
//     }
//     catch(err){
//         console.log(err);
//     }
//     finally{
//         await client.close()
//     }
// }
// main();

//localhost:3000
app.get("/",async (req,res)=>{
    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);

});
// get all the books

app.get("/books/:isbn",(req,res)=>{
    const{isbn} = req.params;// PARAMS IS REQUEST PARAMETER
    const getSpecifibook = db.books.filter((books)=>books.ISBN === isbn);
    if(getSpecifibook.length===0){
        return res.json({"error":`no book found for the ISBN of ${isbn}`});

    }
    return res.json(getSpecifibook[0]);

});
// get the books details according to the category
app.get("/books-category/:cat",(req,res)=>{
    const{cat} = req.params;// PARAMS IS REQUEST PARAMETER
    console.log(cat);
    const getbookCat = db.books.filter((books)=>books.category.includes(cat));
    //console.log(getbookCat);
     if(getbookCat===0){
         return res.json({"error":`no category found for the category of ${cat}`});

     }
     return res.json(getbookCat);

});
// display the all the authors
app.get("/author",(req,res)=>{
    const getAllauthors = db.authors;
    return res.json(getAllauthors);

});
//display the author according to the id 
app.get("/authors/:au",(req,res)=>{
    let {au} = req.params;// PARAMS IS REQUEST PARAMETER
    au = Number(au);
    console.log(au);
    const getauthor = db.authors.filter((authors)=>authors.id === au);
    // console.log("hi",getauthor);
    if(getauthor.length===0){
        return res.json({"error":`no author found for the id of ${au}`});

    }
    return res.json(getauthor[0]);

});

// display the all publicATION 
 app.get("/publication",(reg,res)=>{
     const allPublication = db.publication;
     return res.json(db.publication);
 });

 
// display the publication according to the id
//geting  the publication id 
//publication-id/

app.get("/publication-id/:pid",(reg,res)=>{
    let {pid} = reg.params;
    console.log(pid);
    pid = Number(pid);
    const getpublication = db.publication.filter((publication)=>publication.id === pid);
    console.log(getpublication);
    if(getpublication === 0){
        return reg.json("error:",`no publication found for the is ${pid}`);
    }
    return res.json(getpublication);

})



// post API
//=========================================================================================
// http://localhost:3000/addbook
app.post("/addbook",(request,respons)=>{
    //console.log(req.body);
    // const {newBook} = request.body;
     //console.log(newBook);
     db.books.push(request.body);
    return respons.json(db.books);

     

})
// http://localhost:3000/addauthor
app.post("/addauthor",(request,respons)=>{
    //console.log(req.body);
    // const {newBook} = request.body;
     
     db.authors.push(request.body);
    return respons.json(db.authors);
    

})
//http://localhost:3000/addPublication
app.post("/addPublication",(request,respons)=>{
    db.publication.push(request.body);
    return respons.json(db.publication);
    
});


//update API
//=======================================================================================

///http://localhost:3000/book-update/12345ONE
app.put("/book-update/:isbn",(request,respons)=>{
    const{isbn}=request.params;
     console.log(request.body);
     console.log(request.params);

    db.books.forEach((book)=>{
        if(db.books.ISBN === isbn){
            console.log({...book,...request.body});
            return{...book,...request.body};// its override the ...book
        }
        return book;//else part
    })

    return respons.json(db.books);
    
});

///http://localhost:3000/book-update-author/1
app.put("/book-update-author/:id",(request,respons)=>{
    const{id}=request.params;
      console.log(request.body);
    //  console.log(request.params);

    db.books.forEach((author)=>{      // foreach is not suitable for larg database  we can use map(mal retrun new array)
        if(db.authors.id === id){
            console.log({...author,...request.body});
            return{...author,...request.body};// its override the ...book
        }
        return author;//else part
    })

    return respons.json(db.authors);
    
});
//delete
//===================================================
///http://localhost:3000/book-delete/12345ONE
app.delete("/book-delete/:isbn",(request,respons) => {
    //console.log(request.params);
    //console.log(request);

    const{isbn}=request.params;
    const filterBooks = db.books.filter((book) => book.ISBN!== isbn);
    console.log(filterBooks);
    db.books = filterBooks;
    return respons.json(db.books);
    
});
///http://localhost:3000/book-author-delete/12345ONE/id
app.delete("/book-author-delete/:isbn/:id",(request,respons) => {
    //console.log(request.params);
    //console.log(request);

    let {isbn, id}=request.params;
    id = Number(id);
    db.books.forEach((book)=>{
        if(book.ISBN=== isbn){
            if(!book.authors.includes(id)){
                return;
            }
            book.authors = book.authors.filter((author)=> author!==id);
            return book;
        }
        
    
        return book;
    })
    return respons.json(db.books);
    
});

//task
// get author according the books ispn

app.listen(3000,()=>{
    console.log("MY EXPRESS APP IS RUNNING")
})

