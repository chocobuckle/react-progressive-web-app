import React, { Component } from 'react';
import { HashRouter, Link, Match, Redirect } from 'react-router';
import { Layout, Header, Content, Navigation, Drawer } from 'react-mdl';
import './App.css';
import Posts from './Posts';

class App extends Component {
  closeDrawer = () => {
    document.querySelector('.mdl-layout').MaterialLayout.toggleDrawer();
  }

  render() {
    return (
      <div className='App'>
        <HashRouter>
          <Layout fixedHeader>
            <Header title='Product Hunt PWA'>
              <Navigation className='hide-on-sm'>
                <Link to='/tech'>Tech</Link>
                <Link to='/books'>Books</Link>
                <Link to='/podcasts'>Podcasts</Link>
                <Link to='/games'>Games</Link>
              </Navigation>
            </Header>
            <Drawer title='Product Hunt'>
              <Navigation>
                <Link to='/tech' onClick={this.closeDrawer}>Tech</Link>
                <Link to='/books' onClick={this.closeDrawer}>Books</Link>
                <Link to='/podcasts' onClick={this.closeDrawer}>Podcasts</Link>
                <Link to='/games' onClick={this.closeDrawer}>Games</Link>
              </Navigation>
            </Drawer>
            <Content>
              <Match exactly pattern='/' render={() => <Redirect to='/tech' />} />
              <Match exactly pattern='/tech' component={() => <Posts category='tech' />} />
              <Match exactly pattern='/books' component={() => <Posts category='books' />} />
              <Match exactly pattern='/podcasts' component={() => <Posts category='podcasts' />} />
              <Match exactly pattern='/games' component={() => <Posts category='games' />} />
            </Content>
          </Layout>
        </HashRouter>
      </div>
    );
  }
}

export default App;
