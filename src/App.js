import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { ListTodos } from "./components/ListTodos";
import { Footer } from "./components/Footer";
import { ToggleTodos } from "./components/ToggleTodos";
import { useEffect, useState } from "react";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch('http://localhost:3000/todos')
    .then(response => response.json())
    .then(todos => setTodos(todos))
  }, [])

  const addNewTodo = (title) => {
    const newTodo = {
      id: Date.now(),
      title,
      completed: false
    };

    fetch('http://localhost:3000/todos', {
  		method: 'POST',
  		body: JSON.stringify(newTodo),
  		headers: {
    			'Content-type': 'application/json; charset=UTF-8',
  		},
    })
    .then((response) => response.json())
    .then(newTodo => {
      setTodos((todos) => [newTodo, ...todos]);
		});
    
  }

  const toggleTodo = (id, completed) => {
    const todo = todos.find(todo => todo.id === id);
    if (todo.id === id) todo.completed = completed;
    
    fetch(`http://localhost:3000/todos/${id}`, {
  		method: 'PUT',
      body: JSON.stringify(todo),
  		headers: {
    			'Content-type': 'application/json; charset=UTF-8',
  		},
    })
    .then((response) => response.json())
      .then((toggleTodo) => {
  			 setTodos(todos.map(todo => {
  				if(todo.id !== id) {
  					return todo;
  				}
  				return toggleTodo;
  			}));
  		});
  };

  const updateTodo = (id, title) => {
     fetch(`http://localhost:3000/todos/${id}`, {
  		method: 'PATCH',
      body: JSON.stringify({title}),
  		headers: {
    			'Content-type': 'application/json; charset=UTF-8',
  		},
     }).then(response => response.json())
       .then((todoUpdate) => {
         setTodos(todos.map(todo => {
  				if(todo.id !== id) {
  					return todo;
  				}
  				return todoUpdate;
  			}));
  		});
  };

  const deleteTodo = (id) => {
       fetch(`http://localhost:3000/todos/${id}`, {
      	method: 'DELETE',
       }).then(() => {
         setTodos(todos => todos.filter(todo => todo.id !== id));
       });
  }
  
  const filtereTodos = todos.filter((todo) => {
    switch (filter) {
      case "active":
        return !todo.completed;
      case "completed":
        return todo.completed;
      default:
        return true;
    }
  });

   const activeTodosCount = todos.reduce((count, todo) => {
    if (!todo.completed) count++;
    return count;
  }, 0);
  
   const completedTodosCount = todos.reduce((count, todo) => {
    if (todo.completed) count++;
    return count;
  }, 0);

  const hasCompleted = activeTodosCount < todos.length;

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <InputTodo addNewTodo={addNewTodo}/>
      </header>
      <section className="main">
        {todos.length > 0 && (<ToggleTodos/>)}
        <ListTodos
          todos={filtereTodos}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo} />
      </section>
      {todos.length > 0 &&
        (<Footer
          activeTodosCount={activeTodosCount}
          hasCompleted={hasCompleted}
          filter={filter}
          setFilter={setFilter} />)}
    </section>
  );
}
