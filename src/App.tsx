import { Routes, Route } from 'react-router-dom'
import '../styles.css'
import { LandingPage } from './pages/LandingPage'
import { TemplatesPage } from './pages/TemplatesPage'
import { DemoPage } from './pages/DemoPage'
import { AdminPage } from './pages/AdminPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/templates" element={<TemplatesPage />} />
      <Route path="/demo/:categoryId/:templateId" element={<DemoPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  )
}

export default App
