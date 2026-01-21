import { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { supabase } from '../lib/supabase'

export default function CalendarPage() {
  const [date, setDate] = useState(new Date())
  const [name, setName] = useState('')
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)

  // 날짜를 yyyy-mm-dd 로 변환
  const formatDate = (d) => d.toISOString().slice(0, 10)

  // 선택한 날짜의 이벤트 불러오기
  const fetchEvents = async (selectedDate) => {
    setLoading(true)

    const { data, error } = await supabase
      .from('calendar_events')
      .select('*')
      .eq('event_date', formatDate(selectedDate))
      .order('created_at', { ascending: true })

    if (error) {
      console.error(error)
    } else {
      setEvents(data)
    }

    setLoading(false)
  }

  // 날짜 변경 시 목록 다시 불러오기
  useEffect(() => {
    fetchEvents(date)
  }, [date])

  // 등록
  const addEvent = async () => {
    if (!name.trim()) return

    const { error } = await supabase.from('calendar_events').insert({
      name,
      event_date: formatDate(date)
    })

    if (error) {
      console.error(error)
      return
    }

    setName('')
    fetchEvents(date) // 등록 후 갱신
  }

  return (
    <div style={{ display: 'flex', gap: 40 }}>
      {/* 왼쪽: 달력 */}
      <div>
        <h1>달력</h1>
        <Calendar
          onChange={setDate}
          value={date}
        />
      </div>

      {/* 오른쪽: 리스트 */}
      <div style={{ minWidth: 300 }}>
        <h2>{formatDate(date)} 등록 목록</h2>

        {/* 입력 */}
        <div style={{ marginBottom: 12 }}>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="이름 입력"
          />
          <button onClick={addEvent} style={{ marginLeft: 8 }}>
            등록
          </button>
        </div>

        {loading && <p>불러오는 중...</p>}

        {!loading && events.length === 0 && (
          <p>등록된 이름이 없습니다.</p>
        )}

        <ul>
          {events.map(ev => (
            <li key={ev.id}>
              {ev.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
