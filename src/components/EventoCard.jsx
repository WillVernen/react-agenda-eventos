import React from 'react';

// Componente para renderizar um único card de evento
function EventoCard({ evento, onExcluir, onAgendar }) {
  const { id, nome, data, descricao, imagem, local } = evento;

  return (
    <div className="evento-card">
      <img
        src={imagem}
        alt={nome}
        className="card-imagem"
      />
      <div className="card-conteudo">
        <h3 className="card-titulo">{nome}</h3>
        <p className="card-info">
          <strong>Data:</strong> {data}
        </p>
        <p className="card-info">
          <strong>Local:</strong> {local}
        </p>
        <p className="card-descricao">{descricao}</p>
        
        <div className="card-botoes">
          <button onClick={() => onAgendar(nome)} className="card-botao botao-agendar">Agendar</button>
          <button onClick={() => onExcluir(id)} className="card-botao botao-excluir">Excluir</button>
        </div>
      </div>
    </div>
  );
}

export default EventoCard;