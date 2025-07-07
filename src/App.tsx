import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './contexts/AuthContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import BlogPost from './pages/BlogPost'
import Auth from './pages/Auth'
import AdminDashboard from './pages/AdminDashboard'
import CreateEditPost from './pages/CreateEditPost'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/signin" element={<Auth />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/create" element={<CreateEditPost />} />
            <Route path="/admin/edit/:id" element={<CreateEditPost />} />
          </Routes>
        </Layout>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </Router>
    </AuthProvider>
  )
}

export default App