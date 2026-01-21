import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Posts from './pages/Posts'
import CalendarPage from './pages/Calendar'

function App() {
  return (
    <div style={{ padding: 20 }}>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/" style={{ marginRight: 10 }}>Home</Link>
        <Link to="/posts">Posts</Link>
        <Link to="/calendar">Calendar</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/calendar" element={<CalendarPage />} />
      </Routes>
    </div>
  )
}

export default App
