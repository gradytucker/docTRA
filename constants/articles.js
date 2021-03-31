import { object } from "prop-types";
import firebase from "./../firebase";


function shuffle(array) {
  var i = array.length,
      j = 0,
      temp;
  while (i--) {
      j = Math.floor(Math.random() * (i+1));
      // swap randomly chosen element with current element
      temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  return array;
}

var randomNumer = shuffle([1,2,3,4,5])
var articleList = []


const db = firebase.database();
randomNumer.forEach(element => {
  let index = element
  db.ref('/ArticleURL/'+ String(index)).once("value").then(snapshot => { 
    const WebSiteURL = snapshot.val()
    URLsetting(WebSiteURL,index)
  })
})
// read all the information from firebase database
//set the article information
function URLsetting(dataList,index) {
  articleList[index] = {
    URL: dataList.URL,
    title: dataList.title,
    image: dataList.imgURL
  }
}

articleList = [
  {
    title: 'Exercise 0',
    image: 'https://images.unsplash.com/photo-1519368358672-25b03afee3bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2004&q=80',
    //cta: 'View article'
    URL: 'https://www.youtube.com',
  },
  {
    title: 'Exercise 1',
    image: 'https://images.unsplash.com/photo-1519368358672-25b03afee3bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2004&q=80',
    //cta: 'View article'
    URL: 'https://www.youtube.com',
  },
  {
    title: 'Exercise 2',
    image: 'https://images.unsplash.com/photo-1500522144261-ea64433bbe27?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80',
    //cta: 'View article' 
    URL: 'https://www.facebook.com',
  },
  {
    title: 'Exercise 3',
    image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1326&q=80',
    URL: 'https://www.google.com',
    //cta: 'View article' 
  },
  {
    title: 'Exercise 4',
    image: 'https://images.unsplash.com/photo-1482686115713-0fbcaced6e28?fit=crop&w=1947&q=80',
    //cta: 'View article', 
    URL: 'https://www.instagram.com',
    horizontal: true
  },
];
export default articleList