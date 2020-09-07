import React from 'react';
import './App.css';

import {db} from './firebase';

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

  React.useEffect(() => {
    db.collection('Todo').get().then(todos => {
      todos = todos.docs.map(todo => todo.data());
      setTodoList(todos);
    });
  }, []);

  const addTodo = () => {
    const todoInput = document.getElementById('todo-input')
    const todo = {
      id: Date.now().toString(),
      text: todoInput.value,
      completed: false
    };

    const newTodoList = [...todoList, todo];

    db.collection('Todo').doc(todo.id).set(todo);

    setTodoList(newTodoList);
    todoInput.value = "";
  }

  const toggleTodo = (id) => {
    let updatedTodo;
    const newTodoList = todoList.map(todo => {
      if(todo.id === id) {
        todo.completed = !todo.completed;
        updatedTodo = todo;
      }
      return todo;
    });

    db.collection('Todo').doc(id).set(updatedTodo);

    setTodoList(newTodoList);
  }

  const deleteTodo = (id) => {
    const newTodoList = todoList.filter(todo => todo.id !== id)
    db.collection('Todo').doc(id).delete();
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
