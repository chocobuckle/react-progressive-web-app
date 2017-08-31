import React, { Component } from 'react';
import { string } from 'prop-types';
import { Spinner, Card, CardTitle, CardText, CardActions, Button, Snackbar } from 'react-mdl';

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
  },

  noPostsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    top: '200px'
  },

  noPosts: {
    color: '#3F51B5',
    fontSize: '2rem'
  }
};

class Posts extends Component {
  static propTypes = {
    category: string.isRequired
  }

  state = {
    posts: [],
    isLoaded: false,
    isOffline: false,
    isBackOnline: false
  }

  componentDidMount() {
    window.addEventListener('offline', this.showOfflinePopUp);
    window.addEventListener('online', this.showBackOnlinePopUp);

    const url = `https://api.producthunt.com/v1/categories/${this.props.category}/posts`;
    fetch(url, {
      method: 'get',
      headers: {
        Authorization: 'Bearer 6f541345132b797e0e11785199ff70a2db18bf7a6fe6f6f2aa650edd6bff8c1f'
      }
    }).then(response => response.json()).then(data => {
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

  hideOfflinePopUp = () => {
    this.setState(() => {
      return {
        isOffline: false
      };
    });
  }

  showOfflinePopUp = () => {
    this.setState(() => {
      return {
        isOffline: true,
        isBackOnline: false
      };
    });
  }

  showBackOnlinePopUp = () => {
    this.setState(() => {
      return {
        isOffline: false,
        isBackOnline: true
      };
    });
  }

  hideBackOnlinePopUp = () => {
    this.setState(() => {
      return {
        isBackOnline: false
      };
    });
  }

  render() {
    return (
      <div>
        {
          !this.state.isLoaded && <Spinner style={styles.spinner} />
        }
        {
          this.state.isLoaded && this.state.posts.length === 0 &&
          <div style={styles.noPostsWrapper}>
            <p style={styles.noPosts}>Sorry, there's been no new posts for that category today.</p>
            <p style={styles.noPosts}>Please pick another category.</p>
          </div>
        }
        {
          this.state.posts.map(post => (
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
          ))
        }
        <Snackbar active={this.state.isOffline} action='Undo' onTimeout={this.hideOfflinePopUp}>
          Now you are offline, but still your application works. Magic!
        </Snackbar>
        <Snackbar active={this.state.isBackOnline} action='Undo' onTimeout={this.hideBackOnlinePopUp}>
          You{"'"}re back online!
        </Snackbar>
      </div>
    );
  }
}

export default Posts;
