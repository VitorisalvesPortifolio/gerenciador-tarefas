import React from 'react';
import AulasForm from '../components/AulasForm';
import '../components/AulasForm.css';
import BackToHomeButton from '../components/BackToHomeButton';


/**
 * Página de Aulas
 * Inclui o formulário para adicionar novas aulas e a lista de aulas existentes.
 */
function AulasPage() {
  return (
    <div className="aulas-page">
      <BackToHomeButton />
      <h1 className="text-3xl font-bold mb-6">Aulas</h1>

      {/* Formulário para adicionar novas aulas */}
      <AulasForm />

      {/* Aqui você pode adicionar a lógica para exibir as aulas existentes */}
      {/* Exemplo de lista de aulas, similar ao que fizemos antes */}
    </div>
  );
}

export default AulasPage;
