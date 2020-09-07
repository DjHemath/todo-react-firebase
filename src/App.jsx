import React from 'react';
import logo from './logo.svg';
import './App.css';

function TodoItem(props) {
  const {todo, toggleTodo, deleteTodo} = props;
  return(
    <div>
      <input type="checkbox" onChange={toggleTodo}/> &nbsp;&nbsp;
      <span style={{textDecoration: todo.completed ? 'line-through': ''}}>{todo.text}</span> &nbsp;&nbsp;
      <button onClick={deleteTodo}>Delete</button>
    </div>
  );
}

function App() {
  const [todoList, setTodoList] = React.useState([]);

  const addTodo = () => {
    const todoInput = document.getElementById('todo-input')
    const todo = {
      id: Date.now(),
      text: todoInput.value,
      completed: false
    };

    const newTodoList = [...todoList, todo];

    setTodoList(newTodoList);
    todoInput.value = "";
  }

  const toggleTodo = (id) => {
    const newTodoList = todoList.map(todo => {
      if(todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });

    setTodoList(newTodoList);
  }

  const deleteTodo = (id) => {
    const newTodoList = todoList.filter(todo => todo.id !== id)
    setTodoList(newTodoList);
  }

  const todoItems = todoList.map((todo) => (<TodoItem
                                                key={todo.id}
                                                todo={todo}
                                                toggleTodo={() => toggleTodo(todo.id)}
                                                deleteTodo={() => deleteTodo(todo.id)}
                                              />));

  return (
    <div className="App">
      <h2>Todo App</h2>

      <div>
        <input type="text" placeholder="Enter a Todo..." id="todo-input"/> <button onClick={addTodo}>Add</button>

        <div id="todo-list">
          { todoItems }
        </div>
      </div>
    </div>
  );
}

export default App;
