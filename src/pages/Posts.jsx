import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Posts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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

    fetchPosts()
  }, [])

  return (
    <div>
      <h1>Posts</h1>

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