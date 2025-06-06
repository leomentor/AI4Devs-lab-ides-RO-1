import React from 'react';
import { CandidateForm } from './components/CandidateForm';
import { CandidateList } from './components/CandidateList';
import './App.css';

function App() {
  const handleSuccess = () => {
    alert('Candidato creado exitosamente');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Registro de Candidatos</h1>
      <CandidateForm onSuccess={handleSuccess} />
      <hr className="my-8" />
      <CandidateList />
    </div>
  );
}

export default App;
