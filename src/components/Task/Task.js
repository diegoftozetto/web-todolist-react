import { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./Task.css"

function Task() {
  const [ text, setText ] = useState('');
  const [ errorText, setErrorText ] = useState('');

  const history = useHistory();

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const json = {text: text}

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
            <input
              autoFocus
              type="text"
              className={`form-control ${errorText ? 'invalid' : ''}`}
              id="text"
              name="text"
              placeholder="Informe o nome da tarefa..." value={text}
              onChange={event => {
                setText(event.target.value);
                setErrorText(textValidator(event.target.value));
              }}
              />
            <div className="task-error">{errorText}</div>
            <Link className="btn btn-secondary btn-sm mt-2 mr-2" to="/home" role="button">Cancelar</Link>
            <button
              type="submit"
              className="btn btn-primary btn-sm mt-2"
              disabled={
                textValidator(text)
              }
            >
              Salvar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function textValidator(text) {
  if(text.length === 0)
    return 'Nome da tarefa é obrigatório.'
  else if(text.length > 100)
    return 'Nome da tarefa deve possuir no máximo 100 caracteres.'
  else
    return '';
}

export default Task;
