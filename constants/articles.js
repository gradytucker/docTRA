import { object } from "prop-types";
import firebase from "./../firebase";
import quotes_arr from '../constants/quotes';





// read all the information from firebase database
//set the article information


articleList = [
  {
    title: quotes_arr[Math.floor(Math.random() * quotes_arr.length)],
    image: 'data:image/png;base64,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',
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