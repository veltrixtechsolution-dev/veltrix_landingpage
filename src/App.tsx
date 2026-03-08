import { Routes, Route } from 'react-router-dom'
import '../styles.css'
import { LandingPage } from './pages/LandingPage'
import { TemplatesPage } from './pages/TemplatesPage'
import { DemoPage } from './pages/DemoPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/templates" element={<TemplatesPage />} />
      <Route path="/demo/:categoryId/:templateId" element={<DemoPage />} />
    </Routes>
  )
}

export default App
