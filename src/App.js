import React, { Component } from 'react';
import { Layout, Header, Content, Navigation, Drawer } from 'react-mdl';
import './App.css';

class App extends Component {
  onHandleSubmit = () => {
    console.log('hi!');
  }

  render() {
    return (
      <div className='App'>
        <Layout fixedHeader>
          <Header title='Product Hunt PWA'>
            <Navigation className='hide-on-sm'></Navigation>
          </Header>
          <Drawer title='Product Hunt'>
            <Navigation>

            </Navigation>
          </Drawer>
          <Content>
            Dynamic content here...
          </Content>
        </Layout>
      </div>
    );
  }
}

export default App;
