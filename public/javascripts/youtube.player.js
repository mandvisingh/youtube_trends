const id = window.location.href
  .replace(/^.*\//g, '')
  .replace(/^.*\..*/g, '');

const container = document.getElementById('youtube-player').firstChild;
container.innerHTML = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${id}?autoplay=1" frameborder="0" allowfullscreen></iframe>`;
// Avoided set timeout as not needed, if required it should use arrow function as follows: 
// setTimeout(() =>{
//   container.innerHTML = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${id}?autoplay=1" frameborder="0" allowfullscreen></iframe>`;
// }, 300);