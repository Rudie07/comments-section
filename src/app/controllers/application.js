import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { A } from '@ember/array';

export default class ApplicationController extends Controller {
  serverHost = 'http://localhost:3001';
  socket = null;
  currentName = '';
  currentMessage = '';
  comments = A([]);

  init() {
    super.init(...arguments);
    this.fetchComments();
    this.setUpWebSocket();
  }

  async fetchComments() {
    const response = await fetch(`${this.serverHost}/getComments`);
    const responseJson = await response.json();
    for (const comment of responseJson) {
      this.comments.pushObject(comment);
    }
  }

  getCommentData() {
    if (!this.currentName) {
      alert('Please enter your name!');
      return;
    }
    if (!this.currentMessage) {
      alert('Please enter your comment message!');
      return;
    }
    return {
      name: this.currentName,
      message: this.currentMessage,
    };
  }

  setUpWebSocket() {
    const socket = new WebSocket('ws://localhost:3001');

    socket.onmessage = (event) => {
      const eventData = JSON.parse(event.data);
      alert(`${eventData.name} added a comment`);
      this.comments.pushObject(eventData);
    };

    this.set('socket', socket);
  }

  resetValues() {
    this.set('currentName', '');
    this.set('currentMessage', '');
  }

  getCurrentTime() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  // @action
  // deleteComment(comment) {
  //   console.log('delete', comment);
  // }

  @action
  async deleteAllComments() {
    const deleteRequest = {
      method: 'DELETE',
    };

    const response = await fetch(
      `${this.serverHost}/deleteComments`,
      deleteRequest
    );
    this.set('comments', A([]));
    this.resetValues();
  }

  @action
  async addComment() {
    const commentData = this.getCommentData();
    if (commentData) {
      const requestData = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      };

      const response = await fetch(
        `${this.serverHost}/createComment`,
        requestData
      );
      const responseJson = await response.json();
      commentData.id = responseJson.id;
      commentData.created = this.getCurrentTime();
      this.comments.pushObject(commentData);
      this.resetValues();
      this.socket.send(JSON.stringify(commentData));
    }
  }
}
