import axios from 'axios';

// our API base URL for custom server
//const customBaseURL = 'http://localhost:5000/api';

// our API base URL for JSONPlaceHolder
const customBaseURL ='https://jsonplaceholder.typicode.com/';

const ResponseInterceptor = axios.create({ 
    baseURL: customBaseURL, 
  });

  export const getPosts = () => {
    return ResponseInterceptor.get(`/posts?_limit=50`) ;
  };

  export const viewPosts = (postId) => {
    return (ResponseInterceptor.get(`/posts/${postId}`))
  };
  
  export const getComments = () => {
    return (ResponseInterceptor.get(`/comments?_limit=100`));
  };
  
  export const viewComments = (postId,postListCheck) => {
     if(postListCheck===true){
      //For Custom Server Api
      if(customBaseURL === 'http://localhost:5000/api'){
       return (ResponseInterceptor.get(`/comments/?postId=${postId}?_orderby=DESC?_columnby=id`));
      } 
      //For JsonPlaceHolder Server Api
       if(customBaseURL === 'https://jsonplaceholder.typicode.com/'){
       return (ResponseInterceptor.get(`/comments/?postId=${postId}`));
      }
     }
    else{
      //console.log('no postListCheck',postListCheck);
      return (ResponseInterceptor.get(`/comments/?postId=${postId}`));
  }
};

  export const postComments = (postId,commentData) => {
    return (ResponseInterceptor.post(`/comments/?postId=${postId}`, {
      ...commentData,
      postId: postId
      
    }));
  };

  export const getAlbums = () =>{
    return (ResponseInterceptor.get(`/albums?_limit=30`));
  };

  export const viewAlbums = (postId) => {
    return (ResponseInterceptor.get(`/albums/${postId}`));
  };

  export const getPhotos = () =>{
    return (ResponseInterceptor.get(`/photos?_limit=50`));
  };
  
  export const viewPhotos = (postId) => {
    return (ResponseInterceptor.get(`/photos/?albumId=${postId}`));
  };

  export const getUsers = () =>{
    return (ResponseInterceptor.get(`/users`));
  };
  
  export default ResponseInterceptor;