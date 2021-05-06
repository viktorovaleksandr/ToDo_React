import { TodoItem } from "./TodoItem";

export function ListTodos({ todos, toggleTodo, deleteTodo, updateTodo }) {
 
  return (
    <ul className="todo-list">
      { todos.map(todo => {
        return < TodoItem
          id={todo.id}
          key={todo.id}
          title={todo.title}
          completed={todo.completed}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
      })}
    </ul>
  );
}
