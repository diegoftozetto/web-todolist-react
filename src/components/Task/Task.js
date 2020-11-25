import { NavLink } from "react-router-dom";
import { useState } from 'react';
import "./Task.css"

function Task() {
  const [ taskName, setTaskName ] = useState('');

  const formSubmitHandler = (event) => {
    event.preventDefault();
    var currentText = event.target.taskName.value;
    const json = {text: currentText}

    fetch('https://web-api-todolist.herokuapp.com/tasks', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(json)
    }).then((res)=> {
      res.json().then(dados => {
        if(res.status === 201) {
          event.target.taskName.value = "";
          //console.log(dados.message)
        } else {
          //console.log(dados.message)
        }
      });
    });
  }

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          Adicionar Tarefa
        </div>
        <div className="card-body">
          <h6>Nome da Tarefa</h6>
          <form onSubmit={formSubmitHandler}>
            <input autoFocus type="text" className="form-control mb-2" name="taskName" id="taskName" placeholder="Informe o nome da tarefa..." value={taskName} onChange={event => setTaskName(event.target.value)}/>
            <NavLink className="btn btn-secondary btn-sm mr-2" to="/home" role="button">Cancelar</NavLink>
            <button type="submit" className="btn btn-primary btn-sm">Salvar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Task;
