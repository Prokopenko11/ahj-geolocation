export default class Post {
  constructor(location) {
    this.location = location;
    this.inputPost = document.querySelector('.input-field');
    this.postsList = document.querySelector('.posts-list');

    this.sendPost = this.sendPost.bind(this);
    this.inputPost.addEventListener('keydown', this.sendPost);
  }

  sendPost(e) {
    if (e.key === 'Enter' && this.inputPost.value) {
      this.showPost(this.inputPost.value);

      this.inputPost.value = '';
    }
  }

  createPost(value, location) {
    const date = this.formatDate(new Date().toISOString());

    const post = `
      <li class="posts-list-item">
        <span class="posts-list-item-date">${date}</span>
        <div class="posts-list-item-content">${value}</div>
        <span class="posts-list-item-location">${location}</span>
      </li>
    `;

    return post;
  }

  async showPost(value) {
    const location = await this.location.getLocation();
    const post = this.createPost(value, location);
    this.postsList.insertAdjacentHTML('afterbegin', post);
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(2);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const timeString = `${day}.${month}.${year} ${hours}:${minutes}`;

    return timeString;
  }
}
