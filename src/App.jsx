import React, { useState, useEffect } from 'react';  // 1. Importamos o useEffect
import './App.css'; 
import EventoCard from './components/EventoCard';

// Importa o componente do formulário que criamos
import FormularioAdicionarEvento from './FormularioAdicionarEvento';

// Imagens (mantém como estava)
import showDeMusica from './assets/show-de-rock.jpg';
import festivalDeComida from './assets/festival-comida.jpg';
import teatroAoVivo from './assets/teatro-ao-vivo.avif';
import festivalAnime from './assets/festival-anime.jpg';
import avioesFantasy from './assets/avioes-fantasy.webp';

// Dados iniciais da aplicação
const eventosIniciais = [
  {
    id: 1,
    nome: 'Show de Música',
    data: '2025-10-05',
    descricao: 'Um incrível show ao vivo com bandas locais.',
    imagem: showDeMusica,
    local: 'Av. Santos Dumont, 2020',
  },
  {
    id: 2,
    nome: 'Festival de Comida',
    data: '2025-10-10',
    descricao: 'Explore sabores incríveis do mundo todo.',
    imagem: festivalDeComida,
    local: 'Av. Santos Dumont, 2020',
  },
  {
    id: 3,
    nome: 'Teatro ao Vivo',
    data: '2025-10-15',
    descricao: 'Uma apresentação ao vivo de teatro imperdível.',
    imagem: teatroAoVivo,
    local: 'Av. Santos Dumont, 2020',
  },
  {
    id: 4,
    nome: 'Festival de Animes',
    data: '2025-10-20',
    descricao: 'Está chegando o maior festival de animes, "SANA".',
    imagem: festivalAnime,
    local: 'Av. Santos Dumont, 2020',
  },
  {
    id: 5,
    nome: 'Aviões Fantasy',
    data: '2025-10-25',
    descricao: 'Um mega show da Banda Aviões do Forró com fantasias.',
    imagem: avioesFantasy,
    local: 'Av. Santos Dumont, 2020',
  },
];

function App() {
  // Estado para armazenar a lista de eventos
  const [eventos, setEventos] = useState(eventosIniciais);
  // Estado para controlar a visibilidade do formulário
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // 2. Novo estado para controlar a ordem da lista
  const [ordem, setOrdem] = useState('crescente'); // 'crescente' ou 'decrescente'

  // 3. O Hook useEffect para ordenar a lista
  useEffect(() => {
    // Criamos uma função de ordenação dentro do useEffect
    const ordenarEventos = () => {
      // IMPORTANTE: Criamos uma cópia do array antes de ordenar para não modificar o estado diretamente
      const eventosOrdenados = [...eventos].sort((a, b) => {
        const dataA = new Date(a.data);
        const dataB = new Date(b.data);

        if (ordem === 'crescente') {
          return dataA - dataB; // Ordena do mais antigo para o mais novo
        } else {
          return dataB - dataA; // Ordena do mais novo para o mais antigo
        }
      });
      setEventos(eventosOrdenados);
    };

    ordenarEventos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ordem]); // 4. Array de dependências: O código acima só roda quando 'ordem' mudar.

  // Função para excluir um evento pelo ID
  const handleExcluirEvento = (idDoEvento) => {
    if (window.confirm('Tem certeza de que deseja excluir este evento?')) {
      const novaLista = eventos.filter(evento => evento.id !== idDoEvento);
      setEventos(novaLista);
    }
  };

  // Função para salvar o novo evento vindo do formulário
  const handleSalvarNovoEvento = (novoEvento) => {
    setEventos([...eventos, novoEvento]);
    setMostrarFormulario(false); // Esconde o formulário após salvar
  };
  
  // Função de simulação para agendar um evento
  const handleAgendarEvento = (nomeDoEvento) => {
    alert(`Evento "${nomeDoEvento}" agendado com sucesso! (Simulação)`);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Agenda de Eventos - {new Date().getFullYear()}</h1>
        <div className="header-controles">
          {/* 5. O novo elemento <select> */}
          <div className="controle-ordenacao">
            <label htmlFor="seletor-ordem">Ordenar por:</label>
            <select 
              id="seletor-ordem"
              value={ordem} 
              onChange={(e) => setOrdem(e.target.value)}
              className="seletor-ordem"
            >
              <option value="crescente">Datas Crescentes</option>
              <option value="decrescente">Datas Decrescentes</option>
            </select>
          </div>
          <button onClick={() => setMostrarFormulario(true)} className="botao-adicionar">
            + Adicionar Evento
          </button>
        </div>
      </header>
      
      {/* Renderização Condicional: O formulário só aparece se 'mostrarFormulario' for true */}
      {mostrarFormulario && (
        <FormularioAdicionarEvento 
          onAdicionarEvento={handleSalvarNovoEvento}
          onCancelar={() => setMostrarFormulario(false)}
        />
      )}

      {/* Grid que exibe a lista de cards de eventos */}
      <div className="eventos-grid">
        {eventos.length > 0 ? (
          eventos.map((evento) => (
            <EventoCard 
              key={evento.id} 
              evento={evento} 
              onExcluir={handleExcluirEvento}
              onAgendar={handleAgendarEvento}
            />
          ))
        ) : (
          <p className="mensagem-vazio">Nenhum evento agendado. Que tal adicionar um?</p>
        )}
      </div>
    </div>
  );
}

export default App;