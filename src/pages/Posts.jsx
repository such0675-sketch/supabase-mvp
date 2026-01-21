import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Posts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [content, setContent] = useState('')

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error(error)
    } else {
      setPosts(data)
    }

    setLoading(false)
  }

  const addPost = async () => {
    if (!content.trim()) return

    const { error } = await supabase
      .from('posts')
      .insert({ content })

    if (error) {
      console.error(error)
      return
    }

    setContent('')
    fetchPosts() // 👉 등록 후 다시 조회
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div>
      <h1>Posts</h1>

      {/* 입력 영역 */}
      <div style={{ marginBottom: 16 }}>
        <input
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="글을 입력하세요"
        />
        <button onClick={addPost} style={{ marginLeft: 8 }}>
          등록
        </button>
      </div>

      {loading && <p>로딩중...</p>}
      {!loading && posts.length === 0 && <p>데이터 없음</p>}

      <ul>
        {posts.map(post => (
          <li key={post.id}>
            {post.content}
          </li>
        ))}
      </ul>
    </div>
  )
}