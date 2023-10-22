import React, { useState } from 'react';
import './App.css';

function App() {

  const [inputValue, setInputValue] = useState("")
  const [todos, setTodos] = useState<TodoType[]>([])

  type TodoType ={
    inputValue: string;
    id: number;
    checked: boolean;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value)
    setInputValue(e.target.value)
  }

  const handleSubmit =(e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if(inputValue === '')return;
    const newTodo: TodoType ={
      inputValue,
      id: todos.length,
      checked:false
    }

    setTodos([newTodo, ...todos]);
    setInputValue("")
    const inputDoms = document.getElementById('input_text')||''
    if(inputDoms instanceof HTMLInputElement){
      inputDoms.value = '';
    }

  }

  const handleEdit = (id:number, val:string) => {
    const newTodos = todos.map((todo) => {
      if(todo.id === id) {
        todo.inputValue = val
      }
      return todo
    })

    setTodos(newTodos)
  }

  const handleChecked = (id:number, checked: boolean) => {
    const newTodos = todos.map((todo) => {
      if(todo.id === id) {
        todo.checked = checked
      }
      return todo
    })

    setTodos(newTodos)
  }

  const handleDelete = (id:number) => {
    const newTodos = todos.filter((todo) => {
      return todo.id !== id
    })

    setTodos(newTodos)
  }

  return (
    <div className="App">
      <div>
        <h2>TodoList with TypeScript</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input id='input_text' type='text' onChange={(e) => handleChange(e)} className='inputText'></input>
          <input type='submit' value='作成' className='submitButton'></input>
        </form>
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              <input id='input_text' type='text' onChange={
                (e) => handleEdit(todo.id, e.target.value)
                } 
                className='inputText' value={todo.inputValue}
                disabled={todo.checked}
                ></input>
              <input type='checkbox' onChange={
                (e) => handleChecked(todo.id, e.target.checked)
                }
                ></input>
              <button onClick={()=>handleDelete(todo.id)}>削除</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
