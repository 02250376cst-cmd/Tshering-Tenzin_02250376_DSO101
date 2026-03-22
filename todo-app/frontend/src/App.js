import { useEffect, useState } from "react"
import axios from "axios"

function App() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState("")

  const API = process.env.REACT_APP_API_URL

  const getTasks = async () => {
    const res = await axios.get(`${API}/tasks`)
    setTasks(res.data)
  }

  const addTask = async () => {
    await axios.post(`${API}/tasks`, { title })
    setTitle("")
    getTasks()
  }

  const deleteTask = async (id) => {
    await axios.delete(`${API}/tasks/${id}`)
    getTasks()
  }

  useEffect(() => {
    getTasks()
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1>To Do App</h1>

      <input value={title} onChange={e => setTitle(e.target.value)} />
      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map(t => (
          <li key={t.id}>
            {t.title}
            <button onClick={() => deleteTask(t.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App