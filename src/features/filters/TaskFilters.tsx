export default function TaskFilters(props: {
  setFilter: (filter: string) => void;
  setShow2orMore: () => void;
  btn2orMoreActive: boolean;
}) {
  return (
    <div>
      <button onClick={() => props.setFilter("all")}>All</button>
      <button onClick={() => props.setFilter("active")}>Active</button>
      <button onClick={() => props.setFilter("completed")}>Completed</button>
      <button
        onClick={props.setShow2orMore}
        //  change btn bgColor to show that the filter is currently active
        style={{ background: props.btn2orMoreActive ? "blue" : "" }}
      >
        2 or more words
      </button>
    </div>
  );
}
