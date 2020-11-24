import { NavLink } from "react-router-dom";
import "./ToDoList.css"

function ToDoList() {
  return (
    <div className="container mt-4">
      <div className="jumbotron">
        <h1 className="display-4">To Do List</h1>
        <p className="lead">Libere espaço na sua mente. Recupere a clareza e a tranquilidade, tirando todas essas tarefas da sua cabeça e colocando na sua lista de tarefas.</p>
        <hr/>
        <NavLink className="btn btn-primary btn-sm mb-4" to="/task" role="button">+ Nova Tarefa</NavLink>
      </div>
    </div>
  );
}

export default ToDoList;
