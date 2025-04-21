import React, { useState } from 'react';
import axios from 'axios';
import './AulasForm.css';

/**
 * Componente para criar uma nova aula.
 * Este formulário envia os dados para a API e cria uma nova aula no backend.
 */
function AulasForm() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [dataEntrega, setDataEntrega] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const aulaData = {
      nome,
      descricao,
      data_entrega: dataEntrega
    };

    try {
      await axios.post('http://localhost:8001/aulas', aulaData);
      setResponseMessage('Aula criada com sucesso!');
      setNome('');
      setDescricao('');
      setDataEntrega('');
    } catch (err) {
      setResponseMessage('Erro ao criar a aula');
    }

    setLoading(false);
  };

  return (
    <div className="aulas-page">
      <h2>Página de Aulas</h2>

      <form onSubmit={handleSubmit} className="aula-form">
        <div className="form-group">
          <label htmlFor="nome">Nome da Aula</label>
          <input
            id="nome"
            type="text"
            className="form-input"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="descricao" className="label-descr">Descrição</label>
          <input
            id="descricao"
            type="text"
            className="form-input"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="dataEntrega" className="label-descr">Data de Entrega</label>
          <input
            id="dataEntrega"
            type="date"
            className="form-input"
            value={dataEntrega}
            onChange={(e) => setDataEntrega(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Carregando...' : 'Criar Aula'}
        </button>

        {responseMessage && (
          <p className="response-message">{responseMessage}</p>
        )}
      </form>
    </div>
  );
}

export default AulasForm;
