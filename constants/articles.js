import { object } from "prop-types";
import firebase from "./../firebase";
import quotes_arr from '../constants/quotes';


function shuffle(array) {
  var i = array.length,
    j = 0,
    temp;
  while (i--) {
    j = Math.floor(Math.random() * (i + 1));
    // swap randomly chosen element with current element
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

var randomNumer = shuffle([1, 2, 3, 4, 5])
var articleList = []


const db = firebase.database();
randomNumer.forEach(element => {
  let index = element
  db.ref('/ArticleURL/' + String(index)).once("value").then(snapshot => {
    const WebSiteURL = snapshot.val()
    URLsetting(WebSiteURL, index)
  })
})
// read all the information from firebase database
//set the article information
function URLsetting(dataList, index) {
  articleList[index] = {
    URL: dataList.URL,
    title: dataList.title,
    image: dataList.image
  }
}

articleList = [
  {
    title: quotes_arr[Math.floor(Math.random() * quotes_arr.length)],
    image: 'https://www.vedamani.com/wp-content/uploads/2020/06/file-2.png',
    //cta: 'View article'
    URL: 'https://www.youtube.com',
  },
  {
    title: "Exercise 1",
    image: 'https://www.vedamani.com/wp-content/uploads/2020/06/file-2.png',
    //cta: 'View article'
    URL: 'https://www.youtube.com',
  },
  {
    title: "Exercise 2",
    image: 'https://www.vedamani.com/wp-content/uploads/2020/06/file-2.png',
    //cta: 'View article' 
    URL: 'https://www.facebook.com',
  },
  {
    title: "Exercise 3",
    image: 'https://www.vedamani.com/wp-content/uploads/2020/06/file-2.png',
    URL: 'https://www.google.com',
    //cta: 'View article' 
  },
  {
    title: "Exercise 4",
    image: 'https://www.vedamani.com/wp-content/uploads/2020/06/file-2.png',
    //cta: 'View article', 
    URL: 'https://www.instagram.com',
    horizontal: true
  },
];
export default articleList