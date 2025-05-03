import React, { useState } from 'react';
import API_BASE_URL from "../config/api"; // Correção: import default
import './AulasForm.css';

/**
 * Componente para criar uma nova aula.
 * Este formulário envia os dados para a API e cria uma nova aula no backend.
 * 
 * Utiliza-se o estado local para gerenciar os campos de entrada, a resposta da API,
 * o estado de carregamento e a mensagem de erro ou sucesso.
 */
function AulasForm({ onAulaCreated }) {
  // Estado para armazenar os dados do formulário
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [dataEntrega, setDataEntrega] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * Função chamada ao submeter o formulário.
   * Envia os dados da aula para a API e, se bem-sucedido, limpa os campos e atualiza a lista de aulas.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();  // Impede o comportamento padrão de envio de formulário
    setLoading(true); // Define o estado de carregamento para verdadeiro

    // Cria um objeto com os dados da aula a ser enviada
    const aulaData = {
      nome,  // Envia o campo 'nome' que corresponde à coluna 'nome' na tabela
      descricao,  // Envia o campo 'descricao' que corresponde à coluna 'descricao' na tabela
      data_entrega: dataEntrega,  // Envia o campo 'data_entrega' que corresponde à coluna 'data_entrega'
    };

    try {
      // Envia a requisição POST para criar a nova aula
      const response = await fetch(`${API_BASE_URL}/aulas/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(aulaData), // Envia os dados da aula
      });

      if (!response.ok) {
        throw new Error('Erro ao criar aula');  // Lança um erro se a resposta não for OK
      }

      // Se a aula for criada com sucesso, recupera os dados da nova aula
      const newAula = await response.json();

      // Se a função onAulaCreated for passada como propriedade, chama ela para atualizar a lista de aulas
      if (onAulaCreated) {
        onAulaCreated(newAula); // Notifica o componente pai sobre a nova aula criada
      }

      // Limpa os campos do formulário após a criação da aula
      setNome('');
      setDescricao('');
      setDataEntrega('');
      setResponseMessage('Aula criada com sucesso!');  // Define uma mensagem de sucesso
    } catch (error) {
      // Se ocorrer um erro durante a criação da aula, exibe uma mensagem de erro
      console.error('Erro ao criar aula:', error);
      setResponseMessage('Erro ao criar aula. Tente novamente mais tarde.');  // Define a mensagem de erro
    } finally {
      setLoading(false); // Finaliza o estado de carregamento
    }
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
