import "./Task.css"

function Task() {
  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          Adicionar Tarefa
        </div>
        <div className="card-body">
          <h6>Nome da Tarefa</h6>
          <form className="form-inline">
            <input type="text" className="form-control" id="task-name" placeholder="Informe o nome da tarefa..."/>
            <button type="submit" className="btn btn-secondary ml-2">Cancelar</button>
            <button type="submit" className="btn btn-primary ml-2">Salvar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Task;
