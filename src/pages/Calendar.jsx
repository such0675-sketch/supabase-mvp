import { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { supabase } from '../lib/supabase'

export default function CalendarPage() {
  const [date, setDate] = useState(new Date())
  const [name, setName] = useState('')

  const saveEvent = async () => {
    if (!name.trim()) return

    await supabase.from('calendar_events').insert({
      name,
      event_date: date.toISOString().slice(0, 10)
    })

    setName('')
    alert('등록 완료')
  }

  return (
    <div>
      <h1>달력 등록</h1>

      <Calendar
        onChange={setDate}
        value={date}
      />

      <div style={{ marginTop: 16 }}>
        <p>선택 날짜: {date.toDateString()}</p>

        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="이름 입력"
        />

        <button onClick={saveEvent} style={{ marginLeft: 8 }}>
          등록
        </button>
      </div>
    </div>
  )
}
