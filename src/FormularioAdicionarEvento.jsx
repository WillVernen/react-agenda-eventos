import React, { useState } from 'react';

function FormularioAdicionarEvento({ onAdicionarEvento, onCancelar }) {
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [local, setLocal] = useState('');
  // Este estado agora vai guardar tanto a URL de texto quanto a URL temporária do upload
  const [imagemSrc, setImagemSrc] = useState('');
  const [descricao, setDescricao] = useState('');

  // Nova função para lidar com a seleção do arquivo
  const handleImagemChange = (e) => {
    // Verificamos se o usuário selecionou um arquivo
    if (e.target.files && e.target.files[0]) {
      const arquivo = e.target.files[0];
      // Criamos a URL temporária e a colocamos no estado
      setImagemSrc(URL.createObjectURL(arquivo));
    }
  };

  const limparFormulario = () => {
    setNome('');
    setData('');
    setLocal('');
    setImagemSrc('');
    setDescricao('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome || !data || !local) {
      alert('Por favor, preencha os campos obrigatórios: Nome, Data e Local.');
      return;
    }
    const novoEvento = {
      id: Date.now(),
      nome,
      data,
      local,
      // Usamos a imagem do estado (seja URL ou do upload) ou uma imagem padrão
      imagem: imagemSrc || 'https://via.placeholder.com/300x180.png?text=Evento+Sem+Imagem',
      descricao,
    };
    onAdicionarEvento(novoEvento);
    limparFormulario(); // Limpa o formulário!
  };

  return (
    <div className="modal-overlay">
      <div className="formulario-container">
        <form onSubmit={handleSubmit}>
          <h2>Adicionar Novo Evento</h2>
          <input type="text" placeholder="Nome do Evento" value={nome} onChange={(e) => setNome(e.target.value)} />
          <input type="date" placeholder="Data" value={data} onChange={(e) => setData(e.target.value)} />
          <input type="text" placeholder="Local" value={local} onChange={(e) => setLocal(e.target.value)} />
          <textarea placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
          
          <p className="form-separador">Escolha uma Imagem</p>

          {/* Opção 1: Colar URL */}
          <input 
            type="text" 
            placeholder="Cole a URL da Imagem aqui" 
            value={imagemSrc.startsWith('blob:') ? '' : imagemSrc} // Limpa se for upload
            onChange={(e) => setImagemSrc(e.target.value)} 
          />
          
          <p className="form-separador">OU</p>

          {/* Opção 2: Fazer Upload */}
          <input 
            type="file" 
            accept="image/*" // Aceita apenas arquivos de imagem
            onChange={handleImagemChange} 
            className="input-file"
          />

          {/* Preview da Imagem Selecionada */}
          {imagemSrc && (
            <div className="imagem-preview-container">
              <p>Preview:</p>
              <img src={imagemSrc} alt="Preview do evento" className="imagem-preview" />
            </div>
          )}
          
          <div className="formulario-botoes">
            <button type="submit" className="botao-salvar">Salvar</button>
            <button type="button" onClick={onCancelar} className="botao-cancelar">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormularioAdicionarEvento;