const fs = require("fs"); 

let posts = []
let categories = []

function initialize(){
    posts = JSON.parse(fs.readFileSync('./data/posts.json').toString());
    categories = JSON.parse(fs.readFileSync('./data/categories.json').toString());

    return new Promise((resolve, reject)=> {
        if (posts && categories) {
            resolve({msg: 'Success'})
        } else {
            reject({msg: 'Unable to read file'})
        }
    })
}

function getPosts(){
    return new Promise((resolve, reject)=> {
        if (posts.length != 0) {
            resolve(posts)
        } else {
            reject({msg: 'No Results Returned'})
        }
    })
}

function getPublishedPosts(){
   return new Promise((resolve, reject)=> {
        if (posts.length != 0) {
            resolve(posts.filter(post => post.published == true))
        } else {
            reject({msg: 'No Data'})
        }
    })
}

function getCategories(){
    return new Promise((resolve, reject)=> {
        if (categories.length != 0) {
            resolve(categories)
        } else {
            reject({msg: 'No Data'})
        }
    })
}

function addPost(postData){
    return new Promise((resolve, reject)=> {
        if(postData!= null){
            if (postData.published == undefined) {
                postData.published = false
            } 
            postData.id = posts.length+1;
            postData.postDate = formatDate(new Date())
            posts.push(postData)
            resolve(postData)
        } else {
            reject({msg: 'No Data'})
        }
    })
}

function getPostById(id){
    return new Promise((resolve, reject)=> {
         if (posts.length != 0) {
             resolve(posts.filter(post => post.id == id))
         } else {
             reject({msg: 'No Data'})
         }
     })
 }

 function getPostsByCategory(category){
    return new Promise((resolve, reject)=> {
         if (posts.length != 0) {
             resolve(posts.filter(post => post.category == category))
         } else {
             reject({msg: 'No Data'})
         }
     })
 }

 function getPostsByMinDate(minDateStr){
    return new Promise((resolve, reject)=> {
         if (posts.length != 0) {
             resolve(posts.filter(post => post.postDate >= minDateStr))
         } else {
             reject({msg: 'No Data'})
         }
     })
 }

 function getPublishedPostsByCategory(category){
    return new Promise((resolve, reject)=> {
        if (posts.length != 0) {
            resolve(posts.filter(post =>  post.published == true && post.category == category))
        } else {
            reject({msg: 'No Data'})
        }
    })
 }

 function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}



module.exports = { initialize, getPosts, getPublishedPosts, getCategories, addPost, getPostById, getPostsByCategory, getPostsByMinDate, getPublishedPostsByCategory }