import React , {useState, useEffect} from 'react';
import "./styles.css";
import api from './services/api';
function App() {
  const [repositories, setRepositories]  = useState([]);
  useEffect(() => {
    api.get('repositories').then(response=> {
        setRepositories(response.data);
    });
},[]);

async function handleAddRepository() {
   const response = await api.post('repositories', {
    id: "123",
    url: "https://github.com/josepholiveira",
    title: "Desafio ReactJS",
    techs: ["React", "Node.js"],
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);

}

async function handleRemoveRepository(id) {
  await api.delete(`repositories/${id}`);
  setRepositories(repositories.filter(repositories=>(repositories.id !== id)));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        
            {repositories.map(repositories => <li key={repositories.id}>
               {repositories.title}
              <button type="button" value={repositories.id} onClick={e => handleRemoveRepository(e.target.value)}>
              Remover
    </button>
              </li>)}
         </ul>
        

        <button type="button" onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}
export default App;
