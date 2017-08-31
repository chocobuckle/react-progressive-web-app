import React, { Component } from 'react';
import { HashRouter, Link, Match, Redirect } from 'react-router';
import { Layout, Header, Content, Navigation, Drawer } from 'react-mdl';
import './App.css';
import Tech from './Tech';
import Games from './Games';

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
                <Link to='/games'>Games</Link>
              </Navigation>
            </Header>
            <Drawer title='Product Hunt'>
              <Navigation>
                <Link to='/tech' onClick={this.closeDrawer}>Tech</Link>
                <Link to='/games' onClick={this.closeDrawer}>Games</Link>
              </Navigation>
            </Drawer>
            <Content>
              <Match exactly pattern='/' render={() => <Redirect to='/tech' />} />
              <Match exactly pattern='/tech' component={Tech} />
              <Match exactly pattern='/games' component={Games} />
            </Content>
          </Layout>
        </HashRouter>
      </div>
    );
  }
}

export default App;
