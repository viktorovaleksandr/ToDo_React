export function ToggleTodos({ isCompletedAll }) {
  return (
    <>
      <input defaultChecked={isCompletedAll} id="toggle-all" className="toggle-all" type="checkbox" />
      <label htmlFor="toggle-all">Mark all as complete</label>
    </>
  );
}
