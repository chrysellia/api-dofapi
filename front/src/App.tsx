import './App.css'
import Layout from './Layout'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Users from './pages/Users';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/users" element={<Users />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
