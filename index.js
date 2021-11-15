let books = [{
    ISBN:"12345ONE",
    title: "getting start with MERN",
    authors:[1,2],
    language:"en",
    pubDate:"2021-07-07",
    numOfpage:225,
    category:["fiction","programming","tech","web dev"],
    publication:1
},
{
    ISBN:"12345TWO",
    title: "getting start with PYTHON",
    authors:[1,2],
    language:"en",
    pubDate:"2021-07-08",
    numOfpage:555,
    category:["fiction","tech","web dev"],
    publication:1

}];

let authors = [{
    id: 1,
    name : "abiram",
    books : ["12345ONE","12345TWO"]

},
{
    id: 2, 
    name : "jude",
    books : ["12345ONE","12345TWO"]
}];

let publication = [{
    id : 1,
    name : "ABIcompay publication",
    books : ["12345ONE","12345TWO" ]
},
{
    id : 2,
    name : "KIRIcompay publication",
    books : []
}];

module.exports = {books,authors,publication};
