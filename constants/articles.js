import { object } from "prop-types";
import firebase from "./../firebase";

const db = firebase.database();
db.ref('/ArticleURL').once("value").then(snapshot =>{
  const WebSiteURL = snapshot.val()
  URLsetting(WebSiteURL)
})

function URLsetting(dataList){
  art1.URL = dataList.Youtube.URL
  art1.title = dataList.Youtube.title
  art1.image = dataList.Youtube.imgURL
  return URLlist
}

const art1 = {
    title: '[ Daily Quote ]',
    image: 'https://blog.hubspot.com/hs-fs/hubfs/Sales_Blog/1-min.jpg?width=598&name=1-min.jpg',
    URL: "default",
    //cta: 'View article', 
    horizontal: true
}

export default [
  art1,
  {
    title: 'Exercise 1',
    image: 'https://images.unsplash.com/photo-1519368358672-25b03afee3bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2004&q=80',
    //cta: 'View article'
    URL:'https://www.youtube.com',
  },
  {
    title: 'Exercise 2',
    image: 'https://images.unsplash.com/photo-1500522144261-ea64433bbe27?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80',
    //cta: 'View article' 
    URL:'https://www.facebook.com',
  },
  {
    title: 'Exercise 3',
    image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1326&q=80',
    URL:'https://www.google.com',
    //cta: 'View article' 
  },
  {
    title: 'Exercise 4',
    image: 'https://images.unsplash.com/photo-1482686115713-0fbcaced6e28?fit=crop&w=1947&q=80',
    //cta: 'View article', 
    URL:'https://www.instagram.com',
    horizontal: true
  },
];