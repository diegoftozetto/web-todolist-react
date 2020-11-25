import { NavLink } from "react-router-dom";
import { useEffect, useState } from 'react';
import "./ToDoList.css"

function ToDoList() {
  const [ tasks, setTasks ] = useState(undefined);

  useEffect(() => {
    fetch('https://web-api-todolist.herokuapp.com/tasks').then((res)=>{
      res.json().then(dados => {
        if(res.status === 200) {
          setTasks(dados.sort((a,b) => (a.updatedAt > b.updatedAt) ? -1 : ((b.updatedAt > a.updatedAt) ? 1 : 0)));
        } else {
          //console.log(dados.message)
        }
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
          if(res.status === 200) {
            var filterTasks = tasks.filter(items => items._id !== dados._id);
            filterTasks.unshift(dados);
            setTasks(filterTasks);
          } else {
            //console.log(dados.message)
          }
        });
      });
    }

    const removeClickhandler = (event) => {
      const id = event.target.id.substring(7);

      fetch('https://web-api-todolist.herokuapp.com/tasks/' + id, {
        method: "DELETE"
      }).then((res)=> {
        res.json().then(dados => {
          if(res.status === 200) {
            var filterTasks = tasks.filter(items => items._id !== id);
            setTasks(filterTasks);
            //console.log(dados.message)
          } else {
            //console.log(dados.message)
          }
        });
      });
    }

    items = tasks.map((task) =>
      <li className="list-group-item" key={task._id}>
        <div className="form-check">
          <input
            id={`marked_${task._id}`}
            type="checkbox"
            className="form-check-input mr-2"
            value={task.marked}
            onChange={checkMarkedHandler}
            defaultChecked={task.marked}
          />
          <label className="form-check-label text-task" htmlFor={`marked_${task._id}`}>
            {task.text}
          </label>
        </div>
        <small>
          Última Atualização: {new Date(task.updatedAt).toLocaleString('pt-br')}
          {task.marked ?
              <div className="icons">
                <i className="fas fa-trash icon-remove" onClick={removeClickhandler} id={`marked_${task._id}`}></i>
              </div>: null}
        </small>
      </li>
    );

    notFoundTasks = <p id="no-task">Nenhuma tarefa encontrada...</p>
    list = <ul className="list-group list-group-flush">{items}</ul>;
  }

  return (
    <div className="container mt-4">
      <div className="jumbotron">
        <h1 className="display-4">To-Do List</h1>
        <p className="lead">Libere espaço na sua mente. Recupere a clareza e a tranquilidade, tirando todas essas tarefas da sua cabeça e colocando na sua lista de tarefas.</p>
        <hr/>
        <NavLink className="btn btn-primary btn-sm mb-4" to="/task" role="button">+ Nova Tarefa</NavLink>
        {tasks ? (items.length === 0 ? notFoundTasks : list) : loading}
      </div>
    </div>
  );
}

export default ToDoList;
