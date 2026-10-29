# AutoPrime — Site de Vendas de Veículos

[![CI](https://github.com/matheusoliv19/autoprime-web/actions/workflows/ci.yml/badge.svg)](https://github.com/matheusoliv19/autoprime-web/actions/workflows/ci.yml)
[![Deploy](https://github.com/matheusoliv19/autoprime-web/actions/workflows/deploy.yml/badge.svg)](https://github.com/matheusoliv19/autoprime-web/actions/workflows/deploy.yml)

Plataforma de catálogo e vendas de veículos online desenvolvida com **HTML5**, **CSS3** e **JavaScript puro**.

## Páginas

| Página | Descrição |
|---|---|
| `index.html` | Página inicial com hero, busca rápida e destaques |
| `catalogo.html` | Listagem de veículos com filtros avançados e paginação |
| `detalhes.html` | Detalhes do veículo com galeria e simulador de financiamento |
| `contato.html` | Formulário de contato, canais de atendimento e FAQ |

## Estrutura do Repositório

```
autoprime-web/
├── index.html
├── catalogo.html
├── detalhes.html
├── contato.html
├── css/
│   ├── style.css
│   └── catalogo.css
├── js/
│   ├── dados.js
│   ├── main.js
│   ├── catalogo.js
│   └── detalhes.js
├── img/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
├── README.md
└── PGC-AutoPrime.md
```

## Como executar localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/matheusoliv19/autoprime-web.git
   cd autoprime-web
   ```

2. Abra com Live Server (extensão VS Code) ou via Python:
   ```bash
   python -m http.server 8080
   ```
   Acesse `http://localhost:8080`

## Ferramentas de qualidade (CI)

Instale as dependências de desenvolvimento:
```bash
npm install
```

Execute os linters manualmente:
```bash
npm run lint:html
npm run lint:css
npm run lint:js
```

## Pipeline CI/CD

- **CI** — disparado a cada Pull Request para `main` ou `staging`. Executa lint HTML, CSS e JS, verifica links e segredos expostos.
- **CD** — disparado no merge para `main` (staging) e na criação de tag `vX.Y.Z` (produção).

## Estratégia de Branches

| Branch | Finalidade |
|---|---|
| `main` | Produção — sempre deployável. Protegida: push direto bloqueado. |
| `staging` | Homologação — validação visual antes da promoção à main. |
| `feature/<issue>-<descrição>` | Desenvolvimento de novas funcionalidades. |
| `hotfix/<descrição>` | Correções emergenciais sobre main. |

## Versionamento

Adota-se [SemVer](https://semver.org/lang/pt-BR/) (`MAJOR.MINOR.PATCH`) e [Conventional Commits](https://www.conventionalcommits.org/pt-br).

## Gerente do Projeto

**Matheus Correa de Oliveira** — AP — Squad AutoPrime

## Documentação

Consulte o [Plano de Gerenciamento de Configuração](PGC-AutoPrime.md) para detalhes completos sobre o processo DevOps adotado.
