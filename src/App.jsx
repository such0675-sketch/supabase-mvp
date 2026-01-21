import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'

function App() {
  const [posts, setPosts] = useState([])
  const [content, setContent] = useState('')

  const fetchPosts = async () => {
    const { data } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })

    setPosts(data ?? [])
  }

  const addPost = async () => {
    if (!content.trim()) return
    await supabase.from('posts').insert({ content })
    setContent('')
    fetchPosts()
  }

  useEffect(() => {
    fetchPosts()

    console.log('URL:', import.meta.env.VITE_SUPABASE_URL)
    console.log('KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY)

  }, [])

  return (
    <div style={{ maxWidth: 600, margin: '40px auto' }}>
      <h1>Supabase MVP</h1>

      <input
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="글을 입력하세요"
        style={{ width: '100%', padding: 8 }}
      />

      <button onClick={addPost} style={{ marginTop: 8 }}>
        등록
      </button>

      <ul>
        {posts.map(p => (
          <li key={p.id}>{p.content}</li>
        ))}
      </ul>
    </div>
  )
}

export default App