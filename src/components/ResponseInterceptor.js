import axios from 'axios';

const ResponseInterceptor = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com', // our API base URL
  });
  
  export const getPosts = () => {
    return(ResponseInterceptor.get(`/posts?_limit=50`));
  };

  export const viewPosts = (postId) => {
    return (ResponseInterceptor.get(`/posts/${postId}`))
  };
  
  export const getComments = () => {
    return (ResponseInterceptor.get(`/comments?_limit=100`));
  };
  
  export const viewComments = (postId) => {
    return (ResponseInterceptor.get(`/comments/?postId=${postId}`));
  };

  export const postComments = (postId,commentData) => {
    return (ResponseInterceptor.post(`/comments/?postId=${postId}`, {
      postId: postId,
      ...commentData
    }));
  };

  export const getAlbums = () =>{
    return (ResponseInterceptor.get(`/albums?_limit=50`));
  };

  export const viewAlbums = (postId) => {
    return (ResponseInterceptor.get(`/albums/${postId}`));
  };

  export const getPhotos = () =>{
    return (ResponseInterceptor.get(`/photos?_limit=100`));
  };
  
  export const viewPhotos = (postId) => {
    return (ResponseInterceptor.get(`/photos?albumId=${postId}`));
  };

  export const getUsers = () =>{
    return (ResponseInterceptor.get(`/users`));
  };
  
  export default ResponseInterceptor;