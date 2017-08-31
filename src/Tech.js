import React, { Component } from 'react';
import { Spinner } from 'react-mdl';

const style = {
  margin: 'auto',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  position: 'fixed'
};

class Tech extends Component {
  state = {
    posts: [],
    isLoaded: false
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
          posts: data.posts,
          isLoaded: true
        };
      });
    });
  }

  render() {
    return (
      <div>
        {
          !this.state.isLoaded && <Spinner style={style} />
        }
        {this.state.posts.map(post =>
          <div key={post.user.id}>{post.tagline} by {post.user.name}</div>
        )}
      </div>
    );
  }
}

export default Tech;
