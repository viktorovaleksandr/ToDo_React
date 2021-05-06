import { useState } from "react";

export function InputTodo({ addNewTodo }) {
  const [value, setValue] = useState("");

  return <input className="new-todo" placeholder="What needs to be done?"
     value={value}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          if (e.target.value.trim()) {
            addNewTodo(e.target.value);
          }
          setValue("");
        }
    }}
     onChange={(e) => setValue(e.target.value)}
  />;
}
