import { Layout } from 'antd';
import 'reset-css';

import './App.css';

import { ArticleList, CustomAutoComplete } from './components/modules';

function App() {
  return (
    <div className='App'>
      <Layout>
        <Layout.Header>
          <CustomAutoComplete />
        </Layout.Header>
        <Layout>
          <Layout.Content>
            <ArticleList />
          </Layout.Content>
        </Layout>
        <Layout.Footer />
      </Layout>
    </div>
  );
}

export default App;
