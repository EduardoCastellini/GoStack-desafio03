import React, {useState, useEffect} from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect( () => {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    })
  }, []);

  async function handleAddRepository() {
    const data = {
      "title": `Desafio 03 React, ${Date.now()}`,
      "url": "http://github.com/...",
      "techs": ["React JS", "React Native"]
    }
    const response = await api.post('/repositories', data )
    
    if(response.data){
      setRepositories([...repositories,response.data])
    }
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository => 
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          )
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
