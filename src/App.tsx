import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import './App.css';
import { AuthProvider } from './context/authProvider';
import Layout from './components/Layout';
import AdminLayout from './pages/AdminLayout';
import Login from './pages/Login';

function App() {
  return (
      <BrowserRouter>
        <div className="md:container md:mx-auto">
          <AuthProvider>
            <Routes>
              {/** admin dashboard **/}
              <Route path="/" element={<Layout />}>
                <Route path="/admin/*" element={<AdminLayout />} />
                <Route path="/admin/login" element={<Login />} />
                <Route path="/" element={<Login />} />
              </Route>
            </Routes>
          </AuthProvider>
        </div>
      </BrowserRouter>
  );
}

export default App;
