import { useState, useRef, useEffect } from "react";

export function TodoItem({ id, title, completed, toggleTodo, deleteTodo, updateTodo }) {
  const editRef = useRef();
  const [value, setValue] = useState(title);
  const [editing, setEditing] = useState(false);
  const classNameCompeted = completed ? "completed" : "";
  const classNameEditing = editing ? "editing" : "";

  useEffect(() => {
    if (editing) {
      editRef.current.focus();
    }
  }, [editing]);

  return (
    <li className={`${classNameCompeted} ${classNameEditing}`}>
      <div className="view">
        <input
          onChange={(e) => toggleTodo(id, e.target.checked)}
          className="toggle"
          type="checkbox"
          checked={completed}
        />
        <label
          onDoubleClick={() => {
            setEditing(true);
          }}
        >{title}</label>
        <button type="button" className="destroy"
          onClick={() => deleteTodo(id)}>
        </button>
      </div>
      <input type="text" className="edit"
        onBlur={() => {
          setEditing(false);
          updateTodo(id, value);
        }}
        ref={editRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </li>
  );
}