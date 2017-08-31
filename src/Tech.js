import React, { Component } from 'react';
import { Spinner, Card, CardTitle, CardText, CardActions, Button } from 'react-mdl';

const styles = {
  spinner: {
    margin: 'auto',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: 'fixed'
  },

  card: {
    width: '512px',
    margin: 'auto'
  }
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
      localStorage.setItem('techPosts', JSON.stringify(data.posts));
    }).catch(err => {
      this.setState(() => {
        return {
          posts: JSON.parse(localStorage.getItem('techPosts')),
          isLoaded: true
        };
      });
    });
  }

  render() {
    return (
      <div>
        {
          !this.state.isLoaded && <Spinner style={styles.spinner} />
        }
        {this.state.posts.map(post => (
          <Card key={post.id} shadow={0} style={styles.card}>
            <CardTitle style={{color: '#fff', height: '176px', background: `url(${post.thumbnail.image_url}) center / cover`}}>
              {post.tagline}
            </CardTitle>
            <CardText>
              Posted by {post.user.name}
            </CardText>
            <CardActions>
              <Button colored>Show {post.comments_count} Comments</Button>
            </CardActions>
          </Card>
        ))}
      </div>
    );
  }
}

export default Tech;
