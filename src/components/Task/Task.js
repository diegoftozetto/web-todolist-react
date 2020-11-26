import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./Task.css"

function Task() {
  const history = useHistory();

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
          history.push('/home');
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
            <input autoFocus t minlength="3" type="text" className="form-control mb-2" name="taskName"
              placeholder="Informe o nome da tarefa..." required />
            <Link className="btn btn-secondary btn-sm mr-2" to="/home" role="button">Cancelar</Link>
            <button type="submit" className="btn btn-primary btn-sm">Salvar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Task;
