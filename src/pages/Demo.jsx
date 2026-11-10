import { useMemo, useState } from "react";

const STATUS_PEDIDOS = [
  "Novo",
  "Em análise",
  "Respondido",
  "Agendado",
  "Orçamento enviado",
  "Fechado",
  "Perdido",
];

const FILTROS_DATA = [
  "Todos",
  "Criados hoje",
  "Agendados hoje",
  "Agendados amanhã",
  "Agendados esta semana",
  "Sem agendamento",
];

const FORMAS_PAGAMENTO = [
  "",
  "Pix",
  "Dinheiro",
  "Cartão",
  "Transferência",
  "A combinar",
];

const STATUS_PAGAMENTO = ["", "Pendente", "Pago", "Parcial", "Cancelado"];

function criarDataRelativa(dias, hora = 10, minuto = 0) {
  const data = new Date();
  data.setDate(data.getDate() + dias);
  data.setHours(hora, minuto, 0, 0);
  return data.toISOString();
}

const PEDIDOS_DEMO = [
  {
    id: "demo-1",
    nome: "João Martins",
    whatsapp: "(00) 00000-0000",
    cidade: "Blumenau",
    bairro: "Centro",
    rua: "Rua das Flores",
    numero: "125",
    complemento: "Apartamento 302",
    referencia: "Próximo ao mercado",
    tipo_servico: "Manutenção",
    tipo_aparelho: "Split",
    quantidade_aparelhos: "1",
    marca_aparelho: "Samsung",
    potencia_btu: "12.000 BTUs",
    tipo_imovel: "Residencial",
    problema: "O aparelho liga normalmente, mas não está gelando.",
    aparelho_liga: "Sim",
    ultima_limpeza: "Há mais de 1 ano",
    acesso_condensadora: "Fácil acesso pela sacada",
    precisa_escada: "Não",
    urgencia: "Urgente",
    periodo: "Tarde",
    preferencia_atendimento: "WhatsApp",
    observacoes_extras: "Cliente disponível após as 14h.",
    observacao_interna: "Confirmar valor do deslocamento antes da visita.",
    resumo:
      "Cliente solicita diagnóstico e manutenção de um Split Samsung de 12.000 BTUs.",
    resposta_whatsapp:
      "Olá, João! Recebemos sua solicitação. Podemos agendar uma avaliação para verificar por que o aparelho não está gelando.",
    status: "Novo",
    valor_estimado: 280,
    valor_final: null,
    forma_pagamento: "Pix",
    status_pagamento: "Pendente",
    agendado_para: null,
    created_at: criarDataRelativa(0, 9, 15),
  },
  {
    id: "demo-2",
    nome: "Mariana Silva",
    whatsapp: "(00) 00000-0000",
    cidade: "Gaspar",
    bairro: "Bela Vista",
    rua: "Rua das Acácias",
    numero: "87",
    complemento: "",
    referencia: "Casa com portão branco",
    tipo_servico: "Limpeza preventiva",
    tipo_aparelho: "Split Inverter",
    quantidade_aparelhos: "2",
    marca_aparelho: "LG",
    potencia_btu: "9.000 BTUs",
    tipo_imovel: "Residencial",
    problema: "Aparelhos com cheiro forte ao ligar.",
    aparelho_liga: "Sim",
    ultima_limpeza: "Há 10 meses",
    acesso_condensadora: "Área externa",
    precisa_escada: "Sim",
    urgencia: "Sem urgência",
    periodo: "Manhã",
    preferencia_atendimento: "WhatsApp",
    observacoes_extras: "Há animais na residência.",
    observacao_interna: "Levar escada pequena e material para duas limpezas.",
    resumo: "Limpeza preventiva em dois aparelhos LG Inverter.",
    resposta_whatsapp:
      "Olá, Mariana! Podemos realizar a limpeza dos dois aparelhos no horário agendado. O atendimento deve levar aproximadamente duas horas.",
    status: "Agendado",
    valor_estimado: 420,
    valor_final: null,
    forma_pagamento: "Cartão",
    status_pagamento: "Pendente",
    agendado_para: criarDataRelativa(1, 14, 30),
    created_at: criarDataRelativa(-1, 16, 40),
  },
  {
    id: "demo-3",
    nome: "Carlos Ferreira",
    whatsapp: "(00) 00000-0000",
    cidade: "Indaial",
    bairro: "Nações",
    rua: "Avenida Brasil",
    numero: "410",
    complemento: "Sala comercial 4",
    referencia: "Ao lado da farmácia",
    tipo_servico: "Instalação",
    tipo_aparelho: "Split",
    quantidade_aparelhos: "1",
    marca_aparelho: "Midea",
    potencia_btu: "18.000 BTUs",
    tipo_imovel: "Comercial",
    problema: "Instalação de aparelho novo.",
    aparelho_liga: "Não instalado",
    ultima_limpeza: "Não se aplica",
    acesso_condensadora: "Parede externa",
    precisa_escada: "Sim",
    urgencia: "Esta semana",
    periodo: "Manhã",
    preferencia_atendimento: "Ligação",
    observacoes_extras: "Tubulação já está preparada.",
    observacao_interna: "Serviço concluído e pagamento confirmado.",
    resumo: "Instalação de Split Midea de 18.000 BTUs em sala comercial.",
    resposta_whatsapp:
      "Olá, Carlos! A instalação foi concluída. Agradecemos pela preferência e permanecemos à disposição.",
    status: "Fechado",
    valor_estimado: 650,
    valor_final: 620,
    forma_pagamento: "Pix",
    status_pagamento: "Pago",
    agendado_para: criarDataRelativa(-2, 9, 0),
    created_at: criarDataRelativa(-5, 11, 20),
  },
  {
    id: "demo-4",
    nome: "Fernanda Souza",
    whatsapp: "(00) 00000-0000",
    cidade: "Pomerode",
    bairro: "Centro",
    rua: "Rua XV de Novembro",
    numero: "260",
    complemento: "",
    referencia: "Loja térrea",
    tipo_servico: "Substituição de equipamento",
    tipo_aparelho: "Cassete",
    quantidade_aparelhos: "1",
    marca_aparelho: "Daikin",
    potencia_btu: "24.000 BTUs",
    tipo_imovel: "Comercial",
    problema: "Equipamento antigo apresenta falhas recorrentes.",
    aparelho_liga: "Às vezes",
    ultima_limpeza: "Há 6 meses",
    acesso_condensadora: "Telhado",
    precisa_escada: "Sim",
    urgencia: "Este mês",
    periodo: "Tarde",
    preferencia_atendimento: "E-mail",
    observacoes_extras: "Solicita orçamento com equipamento e instalação.",
    observacao_interna: "Aguardando retorno sobre o orçamento enviado.",
    resumo: "Orçamento para substituição de equipamento Cassete comercial.",
    resposta_whatsapp:
      "Olá, Fernanda! Enviamos o orçamento para substituição do equipamento, incluindo material e instalação.",
    status: "Orçamento enviado",
    valor_estimado: 4800,
    valor_final: null,
    forma_pagamento: "A combinar",
    status_pagamento: "Pendente",
    agendado_para: null,
    created_at: criarDataRelativa(-3, 13, 10),
  },
];

function copiarPedidosDemo() {
  return PEDIDOS_DEMO.map((pedido) => ({ ...pedido }));
}

function Demo() {
  const [pedidos, setPedidos] = useState(copiarPedidosDemo);
  const [tecnicoLogado] = useState({ nome: "Técnico Demonstração" });
  const [carregando, setCarregando] = useState(false);
  const [atualizando, setAtualizando] = useState(false);
  const [filtroStatus, setFiltroStatus] = useState("Todos");
  const [filtroData, setFiltroData] = useState("Todos");
  const [busca, setBusca] = useState("");
  const [salvandoObservacao, setSalvandoObservacao] = useState(null);
  const [salvandoAgendamento, setSalvandoAgendamento] = useState(null);
  const [salvandoPagamento, setSalvandoPagamento] = useState(null);
  const [pedidoAberto, setPedidoAberto] = useState(null);

  function buscarPedidos(mostrarCarregando = true) {
    if (mostrarCarregando) {
      setCarregando(true);
    } else {
      setAtualizando(true);
    }

    window.setTimeout(() => {
      setPedidos(copiarPedidosDemo());
      setCarregando(false);
      setAtualizando(false);
    }, 350);
  }

  function sair() {
    window.location.href = "/";
  }

  function copiarResposta(texto) {
    if (!texto) {
      alert("Este pedido ainda não possui resposta sugerida.");
      return;
    }

    navigator.clipboard.writeText(texto);
    alert("Resposta copiada!");
  }

  function abrirWhatsapp() {
    alert(
      "Modo demonstração: o WhatsApp não será aberto porque os dados deste painel são fictícios."
    );
  }

  function alterarStatus(id, novoStatus) {
    setPedidos((listaAtual) =>
      listaAtual.map((pedido) =>
        pedido.id === id ? { ...pedido, status: novoStatus } : pedido
      )
    );
  }

  function alterarObservacaoLocal(id, valor) {
    setPedidos((listaAtual) =>
      listaAtual.map((pedido) =>
        pedido.id === id ? { ...pedido, observacao_interna: valor } : pedido
      )
    );
  }

  function salvarObservacao(pedido) {
    setSalvandoObservacao(pedido.id);

    window.setTimeout(() => {
      setSalvandoObservacao(null);
      alert("Observação salva apenas nesta demonstração!");
    }, 250);
  }

  function alterarAgendamentoLocal(id, valor) {
    setPedidos((listaAtual) =>
      listaAtual.map((pedido) =>
        pedido.id === id ? { ...pedido, agendado_para: valor } : pedido
      )
    );
  }

  function salvarAgendamento(pedido) {
    setSalvandoAgendamento(pedido.id);

    const agendadoPara = pedido.agendado_para
      ? new Date(pedido.agendado_para).toISOString()
      : null;

    setPedidos((listaAtual) =>
      listaAtual.map((item) =>
        item.id === pedido.id
          ? {
              ...item,
              agendado_para: agendadoPara,
              status: agendadoPara ? "Agendado" : item.status,
            }
          : item
      )
    );

    window.setTimeout(() => {
      setSalvandoAgendamento(null);
      alert("Agendamento salvo apenas nesta demonstração!");
    }, 250);
  }

  function alterarFinanceiroLocal(id, campo, valor) {
    setPedidos((listaAtual) =>
      listaAtual.map((pedido) =>
        pedido.id === id ? { ...pedido, [campo]: valor } : pedido
      )
    );
  }

  function converterValorParaNumero(valor) {
    if (valor === null || valor === undefined || valor === "") {
      return null;
    }

    const valorNormalizado = String(valor).replace(",", ".");
    const numero = Number(valorNormalizado);

    return Number.isFinite(numero) ? numero : null;
  }

  function salvarPagamento(pedido) {
    setSalvandoPagamento(pedido.id);

    const valorEstimado = converterValorParaNumero(pedido.valor_estimado);
    const valorFinal = converterValorParaNumero(pedido.valor_final);

    setPedidos((listaAtual) =>
      listaAtual.map((item) =>
        item.id === pedido.id
          ? {
              ...item,
              valor_estimado: valorEstimado,
              valor_final: valorFinal,
              forma_pagamento: pedido.forma_pagamento || "",
              status_pagamento: pedido.status_pagamento || "",
            }
          : item
      )
    );

    window.setTimeout(() => {
      setSalvandoPagamento(null);
      alert("Pagamento salvo apenas nesta demonstração!");
    }, 250);
  }

  function apagarPedido(id) {
    const confirmar = confirm(
      "Remover este pedido da demonstração? Ele voltará ao atualizar a página."
    );

    if (!confirmar) return;

    setPedidos((listaAtual) => listaAtual.filter((pedido) => pedido.id !== id));
  }

  function alternarDetalhes(id) {
    setPedidoAberto((idAtual) => (idAtual === id ? null : id));
  }

  function textoOuPadrao(valor) {
    return valor && String(valor).trim() !== "" ? valor : "Não informado";
  }

  function formatarQuantidade(quantidade) {
    if (!quantidade) {
      return "Não informado";
    }

    return `${quantidade} aparelho(s)`;
  }

  function montarEndereco(pedido) {
    const partes = [pedido.bairro, pedido.cidade].filter(
      (parte) => parte && String(parte).trim() !== ""
    );

    return partes.length > 0 ? partes.join(" - ") : "Não informado";
  }

  function gerarNumeroPedido(pedido) {
    const pedidosOrdenados = [...pedidos].sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at)
    );

    const indice = pedidosOrdenados.findIndex((item) => item.id === pedido.id);

    if (indice === -1) {
      return "00";
    }

    return String(indice + 1).padStart(2, "0");
  }

  function formatarData(data) {
    if (!data) {
      return "Data não informada";
    }

    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(data));
  }

  function formatarValor(valor) {
    if (valor === null || valor === undefined || valor === "") {
      return "Não informado";
    }

    const numero = Number(valor);

    if (!Number.isFinite(numero)) {
      return "Não informado";
    }

    return numero.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function valorPrincipalPedido(pedido) {
    return pedido.valor_final || pedido.valor_estimado || "";
  }

  function formatarDataParaInput(data) {
    if (!data) {
      return "";
    }

    const dataObj = new Date(data);
    const ano = dataObj.getFullYear();
    const mes = String(dataObj.getMonth() + 1).padStart(2, "0");
    const dia = String(dataObj.getDate()).padStart(2, "0");
    const hora = String(dataObj.getHours()).padStart(2, "0");
    const minuto = String(dataObj.getMinutes()).padStart(2, "0");

    return `${ano}-${mes}-${dia}T${hora}:${minuto}`;
  }

  function formatarDataGoogle(data) {
    return data.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  }

  function gerarLinkGoogleAgenda(pedido) {
    if (!pedido.agendado_para) {
      return "";
    }

    const inicio = new Date(pedido.agendado_para);
    const fim = new Date(inicio.getTime() + 60 * 60 * 1000);
    const endereco = montarEndereco(pedido);

    const titulo = encodeURIComponent(
      `Atendimento ClimaFlow - ${textoOuPadrao(pedido.nome)}`
    );

    const detalhes = encodeURIComponent(
      `Cliente: ${textoOuPadrao(pedido.nome)}
WhatsApp: ${textoOuPadrao(pedido.whatsapp)}
Serviço: ${textoOuPadrao(pedido.tipo_servico)}
Aparelho: ${textoOuPadrao(pedido.tipo_aparelho)}
Quantidade: ${formatarQuantidade(pedido.quantidade_aparelhos)}
Marca: ${textoOuPadrao(pedido.marca_aparelho)}
BTUs: ${textoOuPadrao(pedido.potencia_btu)}
Tipo de imóvel: ${textoOuPadrao(pedido.tipo_imovel)}
Endereço: ${endereco}
Referência: ${textoOuPadrao(pedido.referencia)}
Urgência: ${textoOuPadrao(pedido.urgencia)}
Valor estimado: ${formatarValor(pedido.valor_estimado)}
Valor final: ${formatarValor(pedido.valor_final)}
Pagamento: ${textoOuPadrao(pedido.forma_pagamento)}
Status do pagamento: ${textoOuPadrao(pedido.status_pagamento)}
Problema: ${textoOuPadrao(pedido.problema)}
Observações do cliente: ${textoOuPadrao(pedido.observacoes_extras)}
Observação interna: ${textoOuPadrao(pedido.observacao_interna)}`
    );

    const local = encodeURIComponent(endereco);

    const datas = `${formatarDataGoogle(inicio)}/${formatarDataGoogle(fim)}`;

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${titulo}&dates=${datas}&details=${detalhes}&location=${local}`;
  }

  function classeStatus(status) {
    switch (status) {
      case "Novo":
        return "status-badge status-novo";
      case "Em análise":
        return "status-badge status-analise";
      case "Respondido":
        return "status-badge status-respondido";
      case "Agendado":
        return "status-badge status-agendado";
      case "Orçamento enviado":
        return "status-badge status-orcamento";
      case "Fechado":
        return "status-badge status-fechado";
      case "Perdido":
        return "status-badge status-perdido";
      default:
        return "status-badge";
    }
  }

  function normalizarTexto(valor) {
    return String(valor || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function mesmoDia(dataA, dataB) {
    return (
      dataA.getFullYear() === dataB.getFullYear() &&
      dataA.getMonth() === dataB.getMonth() &&
      dataA.getDate() === dataB.getDate()
    );
  }

  function estaNaMesmaSemana(data, referencia) {
    const inicioSemana = new Date(referencia);
    inicioSemana.setHours(0, 0, 0, 0);
    inicioSemana.setDate(referencia.getDate() - referencia.getDay());

    const fimSemana = new Date(inicioSemana);
    fimSemana.setDate(inicioSemana.getDate() + 7);

    return data >= inicioSemana && data < fimSemana;
  }

  function passaFiltroData(pedido) {
    const hoje = new Date();

    if (filtroData === "Todos") {
      return true;
    }

    if (filtroData === "Sem agendamento") {
      return !pedido.agendado_para;
    }

    if (filtroData === "Criados hoje") {
      if (!pedido.created_at) return false;
      return mesmoDia(new Date(pedido.created_at), hoje);
    }

    if (!pedido.agendado_para) {
      return false;
    }

    const dataAgendamento = new Date(pedido.agendado_para);

    if (filtroData === "Agendados hoje") {
      return mesmoDia(dataAgendamento, hoje);
    }

    if (filtroData === "Agendados amanhã") {
      const amanha = new Date();
      amanha.setDate(hoje.getDate() + 1);
      return mesmoDia(dataAgendamento, amanha);
    }

    if (filtroData === "Agendados esta semana") {
      return estaNaMesmaSemana(dataAgendamento, hoje);
    }

    return true;
  }

  const pedidosFiltrados = (() => {
    const termoBusca = normalizarTexto(busca.trim());

    return pedidos.filter((pedido) => {
      const passaStatus =
        filtroStatus === "Todos" || pedido.status === filtroStatus;

      const passaData = passaFiltroData(pedido);

      const textoBusca = normalizarTexto(
        [
          pedido.nome,
          pedido.whatsapp,
          pedido.cidade,
          pedido.bairro,
          pedido.rua,
          pedido.numero,
          pedido.complemento,
          pedido.referencia,
          pedido.tipo_servico,
          pedido.tipo_aparelho,
          pedido.marca_aparelho,
          pedido.potencia_btu,
          pedido.tipo_imovel,
          pedido.problema,
          pedido.resumo,
          pedido.observacoes_extras,
          pedido.observacao_interna,
          pedido.status,
          pedido.forma_pagamento,
          pedido.status_pagamento,
          pedido.valor_estimado,
          pedido.valor_final,
        ].join(" ")
      );

      const passaBusca = !termoBusca || textoBusca.includes(termoBusca);

      return passaStatus && passaData && passaBusca;
    });
  })();

  const resumoStatus = useMemo(() => {
    return pedidos.reduce(
      (acumulador, pedido) => {
        const status = pedido.status || "Novo";
        acumulador[status] = (acumulador[status] || 0) + 1;
        return acumulador;
      },
      {
        Novo: 0,
        "Em análise": 0,
        Respondido: 0,
        Agendado: 0,
        "Orçamento enviado": 0,
        Fechado: 0,
        Perdido: 0,
      }
    );
  }, [pedidos]);

  const pedidosUrgentes = pedidos.filter(
    (pedido) =>
      pedido.urgencia &&
      String(pedido.urgencia).toLowerCase().includes("urgente")
  ).length;

  const totalPago = pedidos.reduce((total, pedido) => {
    if (pedido.status_pagamento !== "Pago") {
      return total;
    }

    const valor = Number(pedido.valor_final || pedido.valor_estimado || 0);
    return Number.isFinite(valor) ? total + valor : total;
  }, 0);

  const totalPendente = pedidos.reduce((total, pedido) => {
    if (pedido.status_pagamento !== "Pendente") {
      return total;
    }

    const valor = Number(pedido.valor_final || pedido.valor_estimado || 0);
    return Number.isFinite(valor) ? total + valor : total;
  }, 0);

  const taxaFechamento =
    pedidos.length > 0
      ? Math.round(((resumoStatus.Fechado || 0) / pedidos.length) * 100)
      : 0;

  return (
    <div className="pagina">
      <div className="container">
        <section className="painel">
          <div
            style={{
              marginBottom: "18px",
              padding: "12px 16px",
              borderRadius: "10px",
              background: "#fff3cd",
              border: "1px solid #ffe69c",
              color: "#664d03",
              fontWeight: 600,
            }}
          >
            Modo demonstração: todos os nomes, contatos, valores e pedidos abaixo
            são fictícios. Nenhuma alteração é enviada ao Supabase.
          </div>
          <div className="topo-painel">
            <div className="bloco-titulo">
              <span className="tag-painel">ClimaFlow • Demonstração</span>
              <h1>Painel demonstrativo</h1>
              <p className="subtitulo-painel">
                {tecnicoLogado
                  ? `Olá, ${tecnicoLogado.nome}. Gerencie seus pedidos de orçamento, responda clientes e acompanhe o andamento dos atendimentos.`
                  : "Gerencie pedidos de orçamento, responda clientes e acompanhe o andamento dos atendimentos."}
              </p>
            </div>

            <div className="acoes-topo">
              <button
                type="button"
                className="botao-secundario"
                onClick={() => buscarPedidos(true)}
              >
                Restaurar demonstração
              </button>

              <button type="button" className="botao-sair" onClick={sair}>
                Sair
              </button>
            </div>
          </div>

          {atualizando && (
            <p className="texto-atualizando">
              Atualizando pedidos automaticamente...
            </p>
          )}

          <div className="resumo-painel">
            <div className="card-resumo destaque">
              <strong>{pedidos.length}</strong>
              <span>Total de pedidos</span>
            </div>

            <div className="card-resumo">
              <strong>{resumoStatus.Novo || 0}</strong>
              <span>Novos</span>
            </div>

            <div className="card-resumo">
              <strong>{resumoStatus["Em análise"] || 0}</strong>
              <span>Em análise</span>
            </div>

            <div className="card-resumo">
              <strong>{resumoStatus.Respondido || 0}</strong>
              <span>Respondidos</span>
            </div>

            <div className="card-resumo">
              <strong>{resumoStatus.Agendado || 0}</strong>
              <span>Agendados</span>
            </div>

            <div className="card-resumo">
              <strong>{resumoStatus["Orçamento enviado"] || 0}</strong>
              <span>Orçamentos enviados</span>
            </div>

            <div className="card-resumo">
              <strong>{resumoStatus.Fechado || 0}</strong>
              <span>Fechados</span>
            </div>

            <div className="card-resumo">
              <strong>{resumoStatus.Perdido || 0}</strong>
              <span>Perdidos</span>
            </div>

            <div className="card-resumo">
              <strong>{pedidosUrgentes}</strong>
              <span>Urgentes</span>
            </div>

            <div className="card-resumo">
              <strong>{taxaFechamento}%</strong>
              <span>Taxa de fechamento</span>
            </div>

            <div className="card-resumo">
              <strong>{formatarValor(totalPago)}</strong>
              <span>Total pago</span>
            </div>

            <div className="card-resumo">
              <strong>{formatarValor(totalPendente)}</strong>
              <span>Total pendente</span>
            </div>
          </div>

          <div className="barra-filtros">
            <div className="filtros-painel">
              <label>Buscar pedido</label>
              <input
                value={busca}
                onChange={(evento) => setBusca(evento.target.value)}
                placeholder="Nome, WhatsApp, cidade, bairro, rua, problema..."
              />
            </div>

            <div className="filtros-painel">
              <label>Filtrar por status</label>

              <select
                value={filtroStatus}
                onChange={(evento) => setFiltroStatus(evento.target.value)}
              >
                <option value="Todos">Todos</option>

                {STATUS_PEDIDOS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div className="filtros-painel">
              <label>Filtrar por data</label>

              <select
                value={filtroData}
                onChange={(evento) => setFiltroData(evento.target.value)}
              >
                {FILTROS_DATA.map((filtro) => (
                  <option key={filtro} value={filtro}>
                    {filtro}
                  </option>
                ))}
              </select>
            </div>

            <div className="info-filtro">
              <span>
                Exibindo <strong>{pedidosFiltrados.length}</strong> pedido(s)
              </span>
            </div>
          </div>

          {carregando ? (
            <div className="estado-vazio">
              <p>Carregando pedidos...</p>
            </div>
          ) : pedidosFiltrados.length === 0 ? (
            <div className="estado-vazio">
              <p>Nenhum pedido encontrado para este filtro.</p>
            </div>
          ) : (
            <div className="lista-pedidos">
              {pedidosFiltrados.map((pedido) => {
                const linkGoogleAgenda = gerarLinkGoogleAgenda(pedido);
                const detalhesAbertos = pedidoAberto === pedido.id;

                return (
                  <div className="card-pedido" key={pedido.id}>
                    <div className="topo-card">
                      <div>
                        <h3>
                          Pedido #{gerarNumeroPedido(pedido)} •{" "}
                          {textoOuPadrao(pedido.nome)}
                        </h3>

                        <p className="data-pedido">
                          {textoOuPadrao(pedido.tipo_servico)} •{" "}
                          {textoOuPadrao(pedido.tipo_aparelho)} •{" "}
                          {textoOuPadrao(pedido.bairro)}/
                          {textoOuPadrao(pedido.cidade)}
                        </p>

                        <p className="data-pedido">
                          Criado em {formatarData(pedido.created_at)}
                        </p>
                      </div>

                      <span className={classeStatus(pedido.status)}>
                        {textoOuPadrao(pedido.status)}
                      </span>
                    </div>

                    <div className="info-grid">
                      <div className="info-item">
                        <span className="info-label">WhatsApp</span>
                        <strong>{textoOuPadrao(pedido.whatsapp)}</strong>
                      </div>

                      <div className="info-item">
                        <span className="info-label">Agendado para</span>
                        <strong>{formatarData(pedido.agendado_para)}</strong>
                      </div>

                      <div className="info-item">
                        <span className="info-label">Pagamento</span>
                        <strong>
                          {textoOuPadrao(pedido.status_pagamento)} •{" "}
                          {formatarValor(valorPrincipalPedido(pedido))}
                        </strong>
                      </div>

                      <div className="info-item">
                        <span className="info-label">Status do pedido</span>

                        <select
                          value={pedido.status || "Novo"}
                          onChange={(evento) =>
                            alterarStatus(pedido.id, evento.target.value)
                          }
                        >
                          {STATUS_PEDIDOS.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="acoes">
                      <button
                        type="button"
                        className="botao-whatsapp"
                        onClick={() => abrirWhatsapp(pedido)}
                      >
                        Abrir WhatsApp
                      </button>

                      <button
                        type="button"
                        className="botao-secundario"
                        onClick={() => alternarDetalhes(pedido.id)}
                      >
                        {detalhesAbertos ? "Ocultar detalhes" : "Ver detalhes"}
                      </button>

                      <button
                        type="button"
                        className="botao-perigo"
                        onClick={() => apagarPedido(pedido.id)}
                      >
                        Apagar
                      </button>
                    </div>

                    {detalhesAbertos && (
                      <>
                        <div className="info-grid">
                          <div className="info-item">
                            <span className="info-label">Serviço</span>
                            <strong>{textoOuPadrao(pedido.tipo_servico)}</strong>
                          </div>

                          <div className="info-item">
                            <span className="info-label">Aparelho</span>
                            <strong>{textoOuPadrao(pedido.tipo_aparelho)}</strong>
                          </div>

                          <div className="info-item">
                            <span className="info-label">Quantidade</span>
                            <strong>
                              {formatarQuantidade(pedido.quantidade_aparelhos)}
                            </strong>
                          </div>

                          <div className="info-item">
                            <span className="info-label">Marca</span>
                            <strong>{textoOuPadrao(pedido.marca_aparelho)}</strong>
                          </div>

                          <div className="info-item">
                            <span className="info-label">BTUs</span>
                            <strong>{textoOuPadrao(pedido.potencia_btu)}</strong>
                          </div>

                          <div className="info-item">
                            <span className="info-label">Tipo de imóvel</span>
                            <strong>{textoOuPadrao(pedido.tipo_imovel)}</strong>
                          </div>

                          <div className="info-item">
                            <span className="info-label">Urgência</span>
                            <strong>{textoOuPadrao(pedido.urgencia)}</strong>
                          </div>

                          <div className="info-item">
                            <span className="info-label">Período</span>
                            <strong>{textoOuPadrao(pedido.periodo)}</strong>
                          </div>

                          <div className="info-item">
                            <span className="info-label">Preferência</span>
                            <strong>
                              {textoOuPadrao(pedido.preferencia_atendimento)}
                            </strong>
                          </div>

                          <div className="info-item">
                            <span className="info-label">O aparelho liga?</span>
                            <strong>{textoOuPadrao(pedido.aparelho_liga)}</strong>
                          </div>

                          <div className="info-item">
                            <span className="info-label">Última limpeza</span>
                            <strong>{textoOuPadrao(pedido.ultima_limpeza)}</strong>
                          </div>

                          <div className="info-item">
                            <span className="info-label">
                              Acesso à condensadora
                            </span>
                            <strong>
                              {textoOuPadrao(pedido.acesso_condensadora)}
                            </strong>
                          </div>

                          <div className="info-item">
                            <span className="info-label">Precisa de escada?</span>
                            <strong>{textoOuPadrao(pedido.precisa_escada)}</strong>
                          </div>
                        </div>

                        <div className="bloco-texto">
                          <span className="info-label">Endereço completo</span>
                          <p>
                            {montarEndereco(pedido)}
                            {pedido.referencia
                              ? ` | Referência: ${pedido.referencia}`
                              : ""}
                          </p>
                        </div>

                        <div className="bloco-texto">
                          <span className="info-label">Problema relatado</span>
                          <p>{textoOuPadrao(pedido.problema)}</p>
                        </div>

                        <div className="bloco-texto">
                          <span className="info-label">
                            Observações extras do cliente
                          </span>
                          <p>{textoOuPadrao(pedido.observacoes_extras)}</p>
                        </div>

                        <div className="bloco-texto">
                          <span className="info-label">Resumo</span>
                          <p>{textoOuPadrao(pedido.resumo)}</p>
                        </div>

                        <div className="bloco-texto resposta-box">
                          <span className="info-label">Resposta sugerida</span>
                          <p>{textoOuPadrao(pedido.resposta_whatsapp)}</p>

                          <button
                            type="button"
                            className="botao-secundario"
                            onClick={() =>
                              copiarResposta(pedido.resposta_whatsapp)
                            }
                          >
                            Copiar resposta
                          </button>
                        </div>

                        <div className="bloco-texto campo-observacao">
                          <span className="info-label">
                            Agendamento confirmado
                          </span>

                          <input
                            type="datetime-local"
                            value={formatarDataParaInput(pedido.agendado_para)}
                            onChange={(evento) =>
                              alterarAgendamentoLocal(
                                pedido.id,
                                evento.target.value
                              )
                            }
                          />

                          <div className="acoes">
                            <button
                              type="button"
                              className="botao-secundario"
                              onClick={() => salvarAgendamento(pedido)}
                              disabled={salvandoAgendamento === pedido.id}
                            >
                              {salvandoAgendamento === pedido.id
                                ? "Salvando..."
                                : "Salvar agendamento"}
                            </button>

                            {pedido.agendado_para && (
                              <a
                                className="botao-secundario"
                                href={linkGoogleAgenda}
                                target="_blank"
                                rel="noreferrer"
                              >
                                Adicionar ao Google Agenda
                              </a>
                            )}
                          </div>
                        </div>

                        <div className="bloco-texto campo-observacao">
                          <span className="info-label">Pagamento</span>

                          <div className="info-grid">
                            <div className="info-item">
                              <span className="info-label">Valor estimado</span>
                              <input
                                type="number"
                                step="0.01"
                                min="0"
                                value={pedido.valor_estimado ?? ""}
                                onChange={(evento) =>
                                  alterarFinanceiroLocal(
                                    pedido.id,
                                    "valor_estimado",
                                    evento.target.value
                                  )
                                }
                                placeholder="Ex: 250"
                              />
                            </div>

                            <div className="info-item">
                              <span className="info-label">Valor final</span>
                              <input
                                type="number"
                                step="0.01"
                                min="0"
                                value={pedido.valor_final ?? ""}
                                onChange={(evento) =>
                                  alterarFinanceiroLocal(
                                    pedido.id,
                                    "valor_final",
                                    evento.target.value
                                  )
                                }
                                placeholder="Ex: 230"
                              />
                            </div>

                            <div className="info-item">
                              <span className="info-label">Forma</span>
                              <select
                                value={pedido.forma_pagamento || ""}
                                onChange={(evento) =>
                                  alterarFinanceiroLocal(
                                    pedido.id,
                                    "forma_pagamento",
                                    evento.target.value
                                  )
                                }
                              >
                                {FORMAS_PAGAMENTO.map((forma) => (
                                  <option key={forma || "vazio"} value={forma}>
                                    {forma || "Selecione"}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="info-item">
                              <span className="info-label">Status</span>
                              <select
                                value={pedido.status_pagamento || ""}
                                onChange={(evento) =>
                                  alterarFinanceiroLocal(
                                    pedido.id,
                                    "status_pagamento",
                                    evento.target.value
                                  )
                                }
                              >
                                {STATUS_PAGAMENTO.map((status) => (
                                  <option key={status || "vazio"} value={status}>
                                    {status || "Selecione"}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <button
                            type="button"
                            className="botao-secundario"
                            onClick={() => salvarPagamento(pedido)}
                            disabled={salvandoPagamento === pedido.id}
                          >
                            {salvandoPagamento === pedido.id
                              ? "Salvando..."
                              : "Salvar pagamento"}
                          </button>
                        </div>

                        <div className="bloco-texto campo-observacao">
                          <span className="info-label">Observação interna</span>

                          <textarea
                            value={pedido.observacao_interna || ""}
                            onChange={(evento) =>
                              alterarObservacaoLocal(
                                pedido.id,
                                evento.target.value
                              )
                            }
                            placeholder="Ex: cliente pediu urgência, visita marcada para sexta, cobrar deslocamento..."
                            rows={3}
                          />

                          <button
                            type="button"
                            className="botao-secundario"
                            onClick={() => salvarObservacao(pedido)}
                            disabled={salvandoObservacao === pedido.id}
                          >
                            {salvandoObservacao === pedido.id
                              ? "Salvando..."
                              : "Salvar observação"}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Demo;
