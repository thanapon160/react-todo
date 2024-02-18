import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import { task } from 'todoModel.ts'
import { v4 as uuidv4 } from 'uuid'

function App() {
  axios.defaults.baseURL = 'http://localhost:3001';
  const [todosState, setTodosState] = useState<task[]>([])
  const [process, setProcess] = useState<string>('0%')

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
  const getTodoList = async() => {
    try {
      const response = await axios.get('/todos')
      setTodosState(response.data)
    } catch(error) {
      console.error('Error fetching todos:', error);
    }
  }

  useEffect(() => {
    getTodoList();
  }, []);

  useEffect(() => {
    console.log('change',process)
  }, todosState)

  // e: React.MouseEvent<HTMLInputElement, MouseEvent>
  const addTask = () => {
    // const newTask: task = {
    //   id: uuidv4(),
    //   title: '',
    //   completed: false
    // }
    // setTodosState([
    //   ...todosState,
    //   newTask
    // ])
  }
  const toggleTask = (taskId: string) => {
    setTodosState(todosState.map((task) => taskId === task.id ? { ...task, completed: !task.completed } : task))
  }
  const editTask = (taskId: string) => {
    // setTodosState([])
  }
  const deleteTask = (taskId: string) => {
    setTodosState(todosState.filter((task) => task.id !== taskId));
  }

  const handleDropDown = () => {
    setIsDropdownOpen(!isDropdownOpen);

    const dropdown = document.getElementById("myDropdown")
    console.log('drop')
    if (dropdown) {
      console.log('open')
      dropdown.classList.toggle("show");
    }
  }

  return (
    <>
      <section className="process">
        <span className='process-title'>Process</span>
        <div className="process-bar"></div>
        <span className='process-completed'>{todosState.filter(task => task.completed).length} completed</span>
      </section>

      <section className='task-header'>
        <span className="title">Tasks</span>
        <select >
          <option value="all">All</option>
          <option value="done">Done</option>
          <option value="undone">Undone</option>
        </select>
      </section>

      {todosState.map((task) => (
        <section className='task-content' key={task.id}>
          <div className="display">
            <input className='checkbox' checked={task.completed} type="checkbox" onChange={() => toggleTask(task.id)}/>
            <span className={`${task.completed ? "task-incompleted" : "task-completed"} ${'task-name'}`}>{task.title}</span>
          </div>

          <div className="dropdown">
            <span className="material-symbols-outlined dropbtn" onClick={handleDropDown}>
              more_horiz
            </span>
            {isDropdownOpen && (
              <div id="myDropdown" className="dropdown-content">
                <button className='' onClick={() => editTask(task.id)}>Edit</button>
                <button className='delete-btn' onClick={() => deleteTask(task.id)}>Delete</button>
              </div>
            )}
          </div>
        </section>
      ))}

      <section className='task-content'>
        <input className='new-todo task-name' type="text" placeholder='Add your todo...' onChange={addTask}></input>
      </section>
    </>
  )
}

export default App
