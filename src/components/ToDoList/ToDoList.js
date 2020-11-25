import { NavLink } from "react-router-dom";
import { useEffect, useState } from 'react';
import "./ToDoList.css"

function ToDoList() {
  const [ tasks, setTasks ] = useState(undefined);

  useEffect(() => {
    fetch('https://web-api-todolist.herokuapp.com/tasks').then((res)=>{
      res.json().then(dados => {
        console.log(dados)
        setTasks(dados);
      });
    });
  }, []);

  const loading = <p id="loading">Carregando...</p>;

  var items, notFoundTasks, list;
  if(tasks !== undefined) {
    const checkMarkedHandler = (event) => {
      const id = event.target.id.substring(7);
      const json = {marked: event.target.checked}

      fetch('https://web-api-todolist.herokuapp.com/tasks/' + id, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(json)
      }).then((res)=> {
        res.json().then(dados => {
          //console.log(dados.message)
        });
      });
    }

    items = tasks.map((task) =>
      <li className="list-group-item" key={task._id}>
        <input
          id={`marked_${task._id}`}
          type="checkbox"
          className="mr-2"
          value={task.marked}
          onChange={checkMarkedHandler}
          defaultChecked={task.marked}
        />
        <label htmlFor={`marked_${task._id}`}>
          {task.text}
        </label>
      </li>
    );

    notFoundTasks = <p id="no-task">Nenhuma tarefa encontrada...</p>
    list = <ul className="list-group list-group-flush">{items}</ul>;
  }

  return (
    <div className="container mt-4">
      <div className="jumbotron">
        <h1 className="display-4">To Do List</h1>
        <p className="lead">Libere espaço na sua mente. Recupere a clareza e a tranquilidade, tirando todas essas tarefas da sua cabeça e colocando na sua lista de tarefas.</p>
        <hr/>
        <NavLink className="btn btn-primary btn-sm mb-4" to="/task" role="button">+ Nova Tarefa</NavLink>
        {tasks ? (items.length === 0 ? notFoundTasks : list) : loading}
      </div>
    </div>
  );
}

export default ToDoList;
