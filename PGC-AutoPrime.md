# Plano de Gerenciamento de Configuração — Enfoque DevOps
## AP — AutoPrime: Site de Vendas de Veículos
**Versão 1.0**

| Campo | Descrição |
|---|---|
| Projeto | AP — AutoPrime: Site de Vendas de Veículos |
| Gerente de Projeto | Matheus Correa de Oliveira |
| Gerente/Responsável de GCS-DevOps | Matheus Correa de Oliveira |
| Fábrica de Software / Squad | AP — Squad AutoPrime |
| Repositório principal | https://github.com/matheusoliv19/autoprime-web |

### Histórico de Revisões

| Data | Versão | Descrição | Autor |
|---|---|---|---|
| 23/09/2026 | 1.0 | Elaboração inicial do PGC com enfoque em práticas DevOps (CI/CD) para o projeto AutoPrime. | Matheus Correa de Oliveira |

---

## 1. Introdução

Este Plano de Gerenciamento de Configuração (PGC) descreve as atividades de Gestão de Configuração de Software (GCS) que serão executadas ao longo do ciclo de vida do projeto AutoPrime — site de vendas de veículos desenvolvido com HTML5, CSS3 e JavaScript puro. O plano tem ênfase em práticas DevOps, em particular Integração Contínua (CI), Entrega/Implantação Contínua (CD) e automação de pipelines. As atividades envolvem identificar os itens de configuração, manter sua integridade e controlar sistematicamente as mudanças, com o mínimo de burocracia possível e o máximo de automação.

### 1.1 Finalidade

Estabelecer um padrão a ser seguido pelo desenvolvedor e pelos colaboradores do projeto AutoPrime, garantindo rastreabilidade, versionamento e controle de mudanças do produto, apoiado por pipelines automatizados de build, teste, integração e implantação.

### 1.2 Escopo

Este PGC é destinado ao desenvolvedor principal e demais colaboradores da squad **AP — AutoPrime**, responsável pelo desenvolvimento, manutenção e operação do sistema **AutoPrime Web** — plataforma de catálogo e vendas de veículos online. O sistema é composto pelas seguintes páginas e módulos:

- `index.html` — Página inicial com hero, busca rápida, destaques e seções institucionais
- `catalogo.html` — Listagem de veículos com filtros avançados, paginação e ordenação
- `detalhes.html` — Página de detalhes do veículo com galeria e simulador de financiamento
- `contato.html` — Formulário de contato, canais de atendimento e FAQ
- `css/style.css` e `css/catalogo.css` — Folhas de estilo com design system próprio
- `js/dados.js`, `js/main.js`, `js/catalogo.js`, `js/detalhes.js` — Módulos JavaScript de lógica de negócio e apresentação

### 1.3 Definições, Acrônimos e Abreviações

| Termo | Significado |
|---|---|
| GCS | Gestão de Configuração de Software |
| CI | Integração Contínua (Continuous Integration) |
| CD | Entrega/Implantação Contínua (Continuous Delivery / Deployment) |
| IaC | Infraestrutura como Código (Infrastructure as Code) |
| CCM | Comitê de Controle de Mudanças |
| Baseline | Conjunto de itens de configuração que atingiram um estado comprovado de estabilidade |
| Pipeline | Sequência automatizada de etapas de build, teste, análise e implantação |
| Trunk-based Development | Estratégia de branching em que os desenvolvedores integram na branch principal com alta frequência |
| SemVer | Versionamento Semântico (MAJOR.MINOR.PATCH) — ex.: 1.0.0 |
| DORA Metrics | Métricas de desempenho DevOps (Lead Time, Deployment Frequency, MTTR, Change Failure Rate) |
| HTML5 | HyperText Markup Language versão 5 — linguagem de marcação do front-end |
| CSS3 | Cascading Style Sheets versão 3 — folhas de estilo do front-end |
| JS | JavaScript — linguagem de script do lado do cliente |
| PR | Pull Request — solicitação de revisão e integração de código |
| SLI/SLO | Service Level Indicator / Service Level Objective |

### 1.4 Referências

1. Documento base: *Processos de Desenvolvimento de Software e a Integração com GCS*.
2. Template do Plano de Gerenciamento de Configuração (RUP 7.0, IBM) — adaptado.
3. Plano de Gerenciamento de Configuração — Enfoque DevOps, versão template 1.0 (Luiz Camargo, 10/08/2026).
4. Documentação oficial do GitHub Actions: https://docs.github.com/actions
5. Conventional Commits Specification: https://www.conventionalcommits.org
6. Semantic Versioning 2.0.0: https://semver.org/lang/pt-BR/
7. DORA Metrics: https://dora.dev/guides/dora-metrics-four-keys/

### 1.5 Visão Geral

O projeto AutoPrime é uma aplicação web estática (front-end puro), o que simplifica o pipeline de CI/CD em relação a sistemas back-end, mas não dispensa os controles de qualidade, versionamento e rastreabilidade. Diferente de processos tradicionais em que a GCS é predominantemente manual, neste plano cada commit integrado, testado e implantado automaticamente gera evidências de rastreabilidade — logs de pipeline, tags de versão e artefatos publicados —, reduzindo o esforço manual e o tempo entre a mudança e sua entrega em produção.

Por tratar-se de um projeto acadêmico com desenvolvedor único, alguns papéis são exercidos pela mesma pessoa, e o CCM formal é substituído pela auto-revisão documentada e aprovação automatizada do pipeline.

---

## 2. Cultura DevOps e Papéis na Gerência de Configuração

A GCS em contexto DevOps é responsabilidade compartilhada entre desenvolvimento e operações, apoiada por automação. No contexto do projeto AutoPrime, os papéis abaixo podem ser exercidos pelo mesmo indivíduo:

| Papel | Responsável | Responsabilidades |
|---|---|---|
| Gerente de Projeto / Product Owner | Matheus Correa de Oliveira | Prioriza o backlog de funcionalidades, autoriza mudanças de maior impacto e acompanha indicadores de entrega (DORA Metrics). |
| Engenheiro DevOps / Release Engineer | Matheus Correa de Oliveira | Projeta e mantém os pipelines de CI/CD no GitHub Actions, define a estratégia de branching e versionamento, gerencia o deploy no GitHub Pages. |
| Desenvolvedor | Matheus Correa de Oliveira | Integra código com frequência na branch main, escreve e mantém os módulos JavaScript, revisa as mudanças antes do merge e é corresponsável pela qualidade do que é implantado. |
| QA / Verificação Manual | Matheus Correa de Oliveira | Valida funcionalidades nas páginas (filtros, simulador, formulário), verifica responsividade e compatibilidade entre navegadores. |
| Segurança (DevSecOps) | Matheus Correa de Oliveira | Verifica dependências de terceiros (Font Awesome via CDN), garante que nenhuma chave ou dado sensível seja versionado no repositório. |
| Comitê de Controle de Mudanças (CCM) | Matheus Correa de Oliveira | Atua em mudanças de alto impacto (ex.: reestruturação de dados em dados.js, alterações no design system); mudanças de rotina seguem o fluxo automatizado de pipeline. |

---

## 3. Ferramentas, Ambientes e Infraestrutura

### 3.1 Ferramentas do Pipeline

| Categoria | Ferramenta adotada | Finalidade |
|---|---|---|
| Controle de versão | Git + GitHub | Versionamento de todo o código-fonte, arquivos de estilo, scripts e pipelines |
| Orquestração de CI/CD | GitHub Actions | Automação de lint, validação HTML/CSS, implantação e geração de releases |
| Empacotamento | N/A (site estático) | Não há processo de build/compilação; os arquivos são servidos diretamente |
| Registro de artefatos | GitHub Releases | Armazenamento dos pacotes ZIP de cada versão estável (baseline) |
| Infraestrutura como Código | N/A (hospedagem gerenciada) | GitHub Pages gerencia a infraestrutura automaticamente |
| Hospedagem / CD | GitHub Pages | Publicação automática do site estático a cada merge na branch main |
| Gestão de segredos | GitHub Secrets | Tokens e variáveis de ambiente usados nos pipelines |
| Monitoramento | Google Search Console / Uptimerobot (gratuito) | Monitoramento de disponibilidade e indexação |
| Gestão de dependências | Dependabot (GitHub) | Alertas de vulnerabilidades em CDNs e dependências referenciadas |
| Rastreamento de tarefas | GitHub Issues + GitHub Projects | Vinculação de commits e PRs a funcionalidades e correções |
| Análise de qualidade HTML/CSS | W3C Validator (via CI) | Verificação automática de conformidade do HTML e CSS nos pipelines |
| Lint JavaScript | ESLint (via CI) | Verificação de padrões de codificação nos arquivos .js |

### 3.2 Ambientes e Infraestrutura

| Ambiente | URL / Localização | Finalidade | Gatilho de promoção |
|---|---|---|---|
| Desenvolvimento local | localhost / arquivo local | Desenvolvimento e testes manuais pelo desenvolvedor | Trabalho em branch feature/* |
| Staging (Preview) | GitHub Pages — branch staging | Validação visual e funcional antes da produção | Push na branch staging após pipeline de CI aprovado |
| Produção | https://matheusoliv19.github.io/autoprime-web | Acesso pelo usuário final | Merge na branch main com pipeline verde + tag de release |

> **Nota:** por tratar-se de site estático com hospedagem no GitHub Pages, não há infraestrutura de servidor a provisionar. Toda a "infraestrutura" é gerenciada pelos arquivos de workflow do GitHub Actions.

### 3.3 Estratégia de Branching e Versionamento

Adota-se **GitHub Flow** (variação simplificada do Trunk-Based Development), adequado ao tamanho e natureza do projeto:

1. `main` — sempre implantável (deployable); protegida por regra de pipeline verde obrigatório antes do merge. Cada merge aciona deploy automático no GitHub Pages.
2. `feature/<ticket>-<descrição-curta>` — branches de curta duração para cada nova funcionalidade ou correção. Devem ser integradas em até 2 dias.
3. `staging` — branch de homologação para validação visual antes da promoção à main.
4. `hotfix/<descrição>` — correções emergenciais aplicadas sobre main e imediatamente implantadas.

**Versionamento:** adoção de **Versionamento Semântico (SemVer — MAJOR.MINOR.PATCH)** e **Conventional Commits**, permitindo geração automática de changelog e tag de release pelo pipeline.

Exemplos:
- `v1.0.0` — Primeira versão estável publicada (todas as 4 páginas funcionais)
- `v1.1.0` — Adição de nova funcionalidade (ex.: página de comparativo de veículos)
- `v1.1.1` — Correção de bug (ex.: filtro de preço não resetando)
- `v2.0.0` — Mudança estrutural (ex.: migração para framework front-end)

---

## 4. Identificação da Configuração

### 4.1 Itens de Configuração

Os seguintes artefatos são itens de configuração formais do projeto AutoPrime, todos versionados no repositório Git:

| # | Item de Configuração | Localização no repositório |
|---|---|---|
| IC-01 | Página inicial | `index.html` |
| IC-02 | Página de catálogo | `catalogo.html` |
| IC-03 | Página de detalhes do veículo | `detalhes.html` |
| IC-04 | Página de contato | `contato.html` |
| IC-05 | Folha de estilo global | `css/style.css` |
| IC-06 | Folha de estilo do catálogo | `css/catalogo.css` |
| IC-07 | Banco de dados de veículos (JS) | `js/dados.js` |
| IC-08 | Módulo principal (navbar, cards, formulário) | `js/main.js` |
| IC-09 | Módulo do catálogo (filtros, paginação) | `js/catalogo.js` |
| IC-10 | Módulo de detalhes (galeria, simulador) | `js/detalhes.js` |
| IC-11 | Pipeline de CI/CD | `.github/workflows/ci.yml` |
| IC-12 | Pipeline de deploy (GitHub Pages) | `.github/workflows/deploy.yml` |
| IC-13 | Documentação do projeto | `README.md` |
| IC-14 | Este Plano de GCS | `PGC-AutoPrime.md` |

> **Chaves de API, tokens e segredos não são versionados no repositório; são armazenados exclusivamente no GitHub Secrets.**

### 4.2 Convenção de Nomenclatura

| Item | Convenção | Exemplo |
|---|---|---|
| Branch de feature | `feature/<issue>-<descrição-curta>` | `feature/12-filtro-por-cor` |
| Branch de hotfix | `hotfix/<descrição-curta>` | `hotfix/simulador-divisao-zero` |
| Commit | Conventional Commits: `<tipo>(<escopo>): <descrição>` | `feat(catalogo): adiciona filtro por cor do veículo` |
| Commit de correção | `fix(<escopo>): <descrição>` | `fix(simulador): corrige divisão por zero na entrada igual ao preço` |
| Commit de estilo | `style(<escopo>): <descrição>` | `style(hero): ajusta espaçamento do título em mobile` |
| Commit de docs | `docs: <descrição>` | `docs: atualiza README com instruções de execução local` |
| Tag de release | `vX.Y.Z` (SemVer) | `v1.2.0` |
| Issue / ticket | `#<número>` | `#12` |
| Arquivo HTML | `<nome-da-pagina>.html` (kebab-case) | `detalhes.html` |
| Arquivo CSS | `<nome-do-modulo>.css` (kebab-case) | `catalogo.css` |
| Arquivo JS | `<nome-do-modulo>.js` (camelCase) | `catalogo.js` |

### 4.3 Estrutura do Repositório

```
autoprime-web/
│
├── index.html                  # IC-01 — Página inicial
├── catalogo.html               # IC-02 — Catálogo de veículos
├── detalhes.html               # IC-03 — Detalhes do veículo
├── contato.html                # IC-04 — Contato e FAQ
│
├── css/
│   ├── style.css               # IC-05 — Estilos globais
│   └── catalogo.css            # IC-06 — Estilos do catálogo
│
├── js/
│   ├── dados.js                # IC-07 — Base de dados (veículos, CarrosDB, Fmt)
│   ├── main.js                 # IC-08 — Módulo principal
│   ├── catalogo.js             # IC-09 — Módulo do catálogo
│   └── detalhes.js             # IC-10 — Módulo de detalhes
│
├── img/                        # Imagens locais (logos, ícones, fotos offline)
│
├── .github/
│   └── workflows/
│       ├── ci.yml              # IC-11 — Pipeline de CI
│       └── deploy.yml          # IC-12 — Pipeline de deploy
│
├── README.md                   # IC-13 — Documentação do projeto
└── PGC-AutoPrime.md            # IC-14 — Plano de Gerenciamento de Configuração
```

---

## 5. Integração Contínua (CI)

Todo Pull Request para a branch `main` ou `staging` deve disparar automaticamente o pipeline de CI. Nenhuma mudança é integrada sem que o pipeline seja concluído com sucesso.

### 5.1 Etapas do Pipeline de CI

O pipeline de CI do AutoPrime (`.github/workflows/ci.yml`) executa as seguintes etapas em sequência:

1. **Checkout do código** — clona o repositório na versão do PR.
2. **Configuração do ambiente Node.js** — instala dependências de ferramentas de qualidade (ESLint, HTMLHint, Stylelint).
3. **Lint HTML** — valida todos os arquivos `.html` com HTMLHint; falha em erros de estrutura.
4. **Lint CSS** — valida `style.css` e `catalogo.css` com Stylelint; falha em propriedades inválidas.
5. **Lint JavaScript** — valida os módulos `.js` com ESLint (regras ES6+); falha em erros de sintaxe e más práticas.
6. **Verificação de links** — checa se links internos entre as páginas (`href`, `src`) estão íntegros.
7. **Verificação de segredos expostos** — garante que nenhuma chave API, token ou credencial foi acidentalmente adicionada aos arquivos versionados.
8. **Relatório de resultado** — publica o resumo dos checks no PR (GitHub Checks API).

### 5.2 Política de Pull Request e Revisão de Código

1. Todo PR deve descrever claramente o que foi alterado, referenciar a issue relacionada (`Closes #<número>`) e listar os testes manuais realizados.
2. O merge somente é permitido com **pipeline de CI verde** (todos os checks passando).
3. PRs devem ser pequenos e focados — uma funcionalidade ou correção por PR, para facilitar revisão e rollback.
4. Alterações em `js/dados.js` (base de dados de veículos) exigem verificação de que todos os 14 campos obrigatórios de cada veículo estão preenchidos.
5. Alterações no design system (`css/style.css`) exigem verificação de responsividade nos breakpoints: 480px, 768px e 1024px.

### 5.3 Critérios de Qualidade (Quality Gate)

| Critério | Limite aceitável |
|---|---|
| Erros de lint HTML (HTMLHint) | 0 erros bloqueantes |
| Erros de lint CSS (Stylelint) | 0 erros bloqueantes |
| Erros de lint JS (ESLint) | 0 erros; warnings tolerados até 5 |
| Links internos quebrados | 0 |
| Segredos expostos no código | 0 |
| Tamanho máximo de imagem local | 500 KB por arquivo |
| Carregamento da página (Lighthouse — Performance) | Score ≥ 80 |
| Acessibilidade (Lighthouse — Accessibility) | Score ≥ 85 |

---

## 6. Entrega e Implantação Contínua (CD)

Após a aprovação do pipeline de CI, o pipeline de CD é responsável por publicar automaticamente o site no ambiente correspondente (staging ou produção).

### 6.1 Etapas do Pipeline de CD

O pipeline de CD do AutoPrime (`.github/workflows/deploy.yml`) executa:

1. **Deploy automático em Staging** — publicação no branch `gh-pages-staging` (GitHub Pages — ambiente de homologação) após merge na branch `staging`.
2. **Validação visual em staging** — verificação manual pelo desenvolvedor das 4 páginas nos principais navegadores (Chrome, Firefox, Edge).
3. **Gate de aprovação para produção** — após validação em staging, criação de tag SemVer no repositório (`vX.Y.Z`) que dispara o pipeline de produção.
4. **Deploy em Produção** — publicação automática no GitHub Pages (`gh-pages`) após criação da tag de release.
5. **Smoke tests pós-deploy** — verificação automática de que as 4 páginas retornam HTTP 200, que o arquivo `js/dados.js` é carregado corretamente e que a busca básica retorna resultados.
6. **Geração da Release e Changelog** — criação automática do GitHub Release com tag SemVer, changelog gerado a partir dos Conventional Commits desde a última tag, e upload do arquivo ZIP com todos os artefatos do site.

### 6.2 Estratégias de Implantação

| Estratégia | Aplicação no AutoPrime |
|---|---|
| Rolling update | Estratégia padrão — o GitHub Pages substitui os arquivos servidos pela nova versão de forma transparente. |
| Rollback por tag | Em caso de problema, basta fazer o deploy da tag anterior. O pipeline suporta re-deploy de qualquer tag Git existente em menos de 2 minutos. |
| Feature Flags (manual) | Novas seções ou funcionalidades podem ser desenvolvidas e publicadas, porém ocultadas via CSS (`display: none`) até a validação final, sendo ativadas sem novo deploy. |

### 6.3 Rollback e Recuperação

Todo deploy no GitHub Pages é reversível. O procedimento de rollback é:

1. Identificar a última tag estável no repositório (ex.: `v1.1.0`).
2. Executar manualmente o workflow de deploy apontando para a tag estável.
3. O GitHub Pages passa a servir os arquivos da versão anterior em menos de 2 minutos.
4. Registrar o rollback como issue no GitHub com causa e plano de correção.

A versão anterior sempre fica disponível via Git tags e no GitHub Releases (arquivo ZIP).

---

## 7. Infraestrutura como Código (IaC)

### 7.1 Versionamento de Infraestrutura

Por tratar-se de hospedagem gerenciada (GitHub Pages), não há infraestrutura de servidor a provisionar via Terraform ou Ansible. A "infraestrutura como código" do projeto AutoPrime é representada pelos arquivos de workflow do GitHub Actions, que são versionados no repositório como qualquer outro item de configuração:

- `.github/workflows/ci.yml` — define o ambiente de integração (versão do Node.js, ferramentas de lint, ordem das etapas).
- `.github/workflows/deploy.yml` — define o processo de publicação no GitHub Pages, geração de releases e smoke tests.

Qualquer alteração nesses arquivos segue o mesmo fluxo de PR + revisão + pipeline, garantindo que mudanças na infraestrutura também sejam rastreáveis e reversíveis.

### 7.2 Ambientes Efêmeros

O GitHub Pages não suporta ambientes efêmeros por PR de forma nativa no plano gratuito. Como alternativa:

- PRs com alterações visuais significativas devem incluir **screenshots antes/depois** no corpo do PR.
- Para validação mais rigorosa, o desenvolvedor pode executar o site localmente via **Live Server** (extensão VS Code) ou `python -m http.server` antes de abrir o PR.
- Em versões futuras do projeto, considera-se adotar **Netlify Deploy Previews** ou **Vercel Preview Deployments** para ambientes efêmeros automáticos por PR.

---

## 8. Controle de Configuração e Mudança

### 8.1 Processo de Solicitação de Mudança

Toda mudança no projeto AutoPrime, independente de tamanho, segue o fluxo abaixo:

```
[GitHub Issue] → [Branch feature/*] → [Desenvolvimento local]
    → [Commit(s) com Conventional Commits] → [Push]
    → [Pull Request] → [Pipeline CI verde]
    → [Merge na main] → [Pipeline CD] → [Deploy em produção]
```

Esse fluxo constitui, por si, o registro formal e rastreável da mudança, vinculando:
- A **descrição da mudança** (issue + PR)
- O **código alterado** (commits)
- A **validação automatizada** (resultado do pipeline de CI)
- A **evidência de implantação** (log do pipeline de CD + tag de release)

### 8.2 Comitê de Controle de Mudança (CCM)

**Composição:** Matheus Correa de Oliveira (desenvolvedor/gerente) e, quando disponível, o orientador do projeto.

O CCM é acionado apenas nas seguintes situações de **alto impacto**:

| Situação | Ação do CCM |
|---|---|
| Reestruturação da base de dados de veículos (`dados.js`) com alteração de campos obrigatórios | Revisão e aprovação formal antes do merge |
| Mudança completa do design system (paleta de cores, tipografia, grid) | Revisão de impacto em todas as páginas |
| Alteração dos arquivos de pipeline de CI/CD | Revisão para garantir que o fluxo de entrega não seja quebrado |
| Adição de dependências externas (novos CDNs ou bibliotecas) | Avaliação de segurança e impacto na performance |
| Rollback de versão em produção | Autorização e registro formal |

Mudanças de rotina (novas funcionalidades menores, ajustes de layout, correção de bugs) **não requerem** reunião formal do CCM — basta o fluxo automatizado de PR + pipeline verde.

---

## 9. Baselines e Releases

### 9.1 Geração Automática de Baseline

Cada implantação bem-sucedida em produção gera automaticamente uma baseline, composta por:

- **Tag Git SemVer** (ex.: `v1.2.0`) associada ao commit exato implantado
- **GitHub Release** com o arquivo ZIP dos artefatos do site
- **Log do pipeline de CD** como evidência de que todos os smoke tests passaram

O histórico completo de baselines fica disponível na aba **Releases** do repositório GitHub.

### 9.2 Notas de Versão (Release Notes)

As notas de release são geradas automaticamente pelo pipeline a partir dos Conventional Commits desde a última tag, organizadas por tipo de mudança:

```markdown
## v1.2.0 — 2026-09-23

### Novas Funcionalidades
- feat(catalogo): adiciona filtro por cor do veículo (#15)
- feat(detalhes): adiciona comparativo entre dois veículos (#18)

### Correções
- fix(simulador): corrige divisão por zero quando entrada = preço (#20)
- fix(navbar): corrige menu mobile não fechando após clique em link (#21)

### Melhorias de Estilo
- style(hero): ajusta altura do hero em telas ultrawide (#22)

### Documentação
- docs: atualiza README com instruções de deploy (#19)
```

---

## 10. Estimativa do Status de Configuração

### 10.1 Monitoramento e Observabilidade

| Ferramenta | O que monitora |
|---|---|
| Uptimerobot (gratuito) | Disponibilidade do site em produção — alerta por e-mail em caso de indisponibilidade |
| Google Search Console | Indexação e erros de rastreamento das páginas |
| GitHub Actions — logs | Histórico de todos os pipelines de CI e CD executados |
| Lighthouse CI (no pipeline) | Score de performance, acessibilidade, SEO e boas práticas a cada deploy |

### 10.2 Métricas DORA

| Métrica | Meta para o projeto AutoPrime | Como medir |
|---|---|---|
| Deployment Frequency | ≥ 2 deploys por semana em fase ativa | Número de GitHub Releases criadas por semana |
| Lead Time for Changes | < 24 horas (do commit ao deploy em produção) | Timestamp do primeiro commit da feature até o timestamp do deploy |
| Change Failure Rate | < 10% dos deploys resultam em rollback ou hotfix | Número de hotfixes / total de deploys no período |
| Mean Time to Restore (MTTR) | < 2 horas para restaurar o site após falha | Tempo entre detecção da falha (alerta Uptimerobot) e conclusão do rollback/fix |

### 10.3 Relatórios e Auditorias

O histórico de pipelines do GitHub Actions, os logs de commits, os PRs e as GitHub Releases constituem o principal insumo de auditoria de GCS, dispensando relatórios manuais na maior parte dos casos. Para fins acadêmicos, os seguintes artefatos servem como evidência de auditoria:

1. **Histórico de commits** com mensagens no padrão Conventional Commits
2. **Pull Requests** com descrição, CI verde e, quando aplicável, screenshots
3. **GitHub Releases** com tag SemVer, changelog e arquivo ZIP dos artefatos
4. **Logs dos pipelines** de CI e CD arquivados no GitHub Actions (retidos por 90 dias por padrão)

---

## 11. Marcos

| # | Marco | Descrição | Data prevista |
|---|---|---|---|
| M1 | Repositório configurado | Repositório criado no GitHub, branches protegidas, README.md inicial e este PGC versionados. | Sprint 1 |
| M2 | Pipeline de CI operacional | Workflow `.github/workflows/ci.yml` implementado e validando lint HTML, CSS e JS em todo PR. | Sprint 1 |
| M3 | v1.0.0 — Primeira release | Todas as 4 páginas funcionais (index, catalogo, detalhes, contato) publicadas em produção via pipeline de CD. | Sprint 2 |
| M4 | Pipeline de CD completo | Deploy automático para staging e produção, smoke tests e geração de Release Notes operacionais. | Sprint 2 |
| M5 | v1.1.0 — Melhorias pós-feedback | Correções e melhorias identificadas na revisão da v1.0.0 integradas e publicadas. | Sprint 3 |
| M6 | Auditoria final de GCS | Revisão do PGC, verificação de rastreabilidade de todos os itens de configuração e entrega da documentação final. | Sprint 4 |

---

## 12. Treinamento e Recursos

### Ferramentas e conhecimentos necessários

| Área | Ferramenta / Conceito | Nível necessário |
|---|---|---|
| Controle de versão | Git (commit, branch, merge, tag, rebase) | Intermediário |
| Plataforma | GitHub (Issues, PRs, Actions, Pages, Releases) | Intermediário |
| Automação de pipeline | GitHub Actions (YAML, jobs, steps, secrets) | Básico-Intermediário |
| Front-end | HTML5, CSS3, JavaScript ES6+ | Intermediário (já dominado) |
| Qualidade | ESLint, HTMLHint, Stylelint | Básico |
| Versionamento semântico | SemVer + Conventional Commits | Básico |
| Monitoramento | Lighthouse CI, Uptimerobot | Básico |

### Recursos de aprendizado sugeridos

- **Git / GitHub Actions:** https://docs.github.com/pt/actions
- **Conventional Commits:** https://www.conventionalcommits.org/pt-br
- **SemVer:** https://semver.org/lang/pt-BR/
- **ESLint:** https://eslint.org/docs/latest/
- **Lighthouse:** https://developer.chrome.com/docs/lighthouse

---

## 13. Controle de Software de Subcontratados, Fornecedores e Dependências de Terceiros

O projeto AutoPrime utiliza as seguintes dependências de terceiros, todas referenciadas via CDN ou declaradas explicitamente:

| Dependência | Versão | Forma de uso | Controle |
|---|---|---|---|
| Font Awesome | 6.5.0 | CDN (cdnjs.cloudflare.com) | Versão fixada na URL do CDN; não usar @latest |
| Google Fonts (se aplicável) | — | CDN | Versão implícita pelo Google; monitorar mudanças de API |

**Políticas de controle de dependências:**

1. **Versões fixadas:** toda dependência de CDN deve ter a versão explicitamente fixada na URL (ex.: `/font-awesome/6.5.0/css/all.min.css`). É **proibido** usar URLs com `/latest/`.
2. **Análise de vulnerabilidades:** o Dependabot está configurado para emitir alertas de segurança no repositório. Vulnerabilidades críticas ou altas devem ser corrigidas antes do próximo deploy em produção.
3. **Adição de novas dependências:** qualquer nova biblioteca ou CDN deve ser avaliada quanto a: licença de uso, tamanho do impacto na performance (Lighthouse), histórico de manutenção e ausência de vulnerabilidades conhecidas.
4. **Sem dependências de back-end:** por ser um site estático, não há `package.json` de produção nem dependências de servidor. As únicas ferramentas de desenvolvimento (`devDependencies`) são as de lint e CI.

---

## 14. Quadro-Resumo do Pipeline CI/CD

Resumo do fluxo padrão do projeto AutoPrime, do commit à produção:

| Etapa | Descrição | Gatilho | Responsável |
|---|---|---|---|
| Issue | Abertura de item de trabalho descrevendo a mudança desejada. | Manual | Matheus Correa de Oliveira |
| Branch | Criação de branch `feature/<issue>-<descrição>` a partir de main. | Manual | Matheus Correa de Oliveira |
| Desenvolvimento | Codificação local, testes manuais em Live Server. | Manual | Matheus Correa de Oliveira |
| Pull Request | Abertura de PR com descrição, referência à issue e screenshots (se visual). | Manual | Matheus Correa de Oliveira |
| CI | Lint HTML + CSS + JS, verificação de links e segredos. | Abertura/atualização de PR | GitHub Actions |
| Merge | Integração da mudança na branch main. | CI verde | Matheus Correa de Oliveira |
| CD — Staging | Deploy automático em homologação (branch staging do GitHub Pages). | Merge na main | GitHub Actions |
| Validação | Verificação manual das 4 páginas em staging (Chrome, Firefox, Edge). | Manual | Matheus Correa de Oliveira |
| Gate de Release | Criação da tag SemVer (`vX.Y.Z`) que autoriza o deploy em produção. | Manual após validação em staging | Matheus Correa de Oliveira |
| CD — Produção | Deploy no GitHub Pages (produção) + smoke tests automáticos. | Criação de tag `vX.Y.Z` | GitHub Actions |
| Release | Geração automática do GitHub Release com changelog e arquivo ZIP. | Deploy bem-sucedido em produção | GitHub Actions |

---

> **Nota final:** este PGC foi elaborado especificamente para o projeto AutoPrime (site de vendas de veículos — HTML5/CSS3/JS puro), com enfoque em práticas DevOps adaptadas à realidade de um projeto front-end estático de porte acadêmico. Os quatro pilares da GCS — **identificação**, **controle de versão**, **controle de mudanças** e **auditoria/status** — são mantidos integralmente, agora suportados por automação via GitHub Actions.
