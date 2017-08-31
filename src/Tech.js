import React, { Component } from 'react';

class Tech extends Component {
  state = {
    posts: []
  }

  componentDidMount() {
    const url = 'https://api.producthunt.com/v1/categories/tech/posts';
    fetch(url, {
      method: 'get',
      headers: {
        Authorization: 'Bearer 6f541345132b797e0e11785199ff70a2db18bf7a6fe6f6f2aa650edd6bff8c1f'
      }
    }).then(response => response.json()).then(data => {
      console.log(data);
      this.setState(() => {
        return {
          posts: data.posts
        };
      });
    });
  }

  render() {
    return (
      <div>
        {this.state.posts.map(post =>
          <div key={post.user.id}>{post.tagline} by {post.user.name}</div>
        )}
      </div>
    );
  }
}

export default Tech;
