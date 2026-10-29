# Evidências de Gerenciamento de Configuração — AutoPrime

Repositório: https://github.com/matheusoliv19/autoprime-web  
Responsável: Matheus Correa de Oliveira  
Data: 28/10/2026

---

## 1. Estrutura do Repositório

O repositório segue exatamente a estrutura definida no PGC (seção 4.3), com todos os 14 itens de configuração versionados:

```
autoprime-web/
├── index.html              # IC-01
├── catalogo.html           # IC-02
├── detalhes.html           # IC-03
├── contato.html            # IC-04
├── css/style.css           # IC-05
├── css/catalogo.css        # IC-06
├── js/dados.js             # IC-07
├── js/main.js              # IC-08
├── js/catalogo.js          # IC-09
├── js/detalhes.js          # IC-10
├── .github/workflows/ci.yml     # IC-11
├── .github/workflows/deploy.yml # IC-12
├── README.md               # IC-13
└── PGC-AutoPrime.md        # IC-14
```

---

## 2. PGC Publicado no Repositório

O Plano de Gerenciamento de Configuração está versionado como item de configuração IC-14:

- **Arquivo:** `PGC-AutoPrime.md`
- **URL:** https://github.com/matheusoliv19/autoprime-web/blob/main/PGC-AutoPrime.md
- **Commit:** `54d622c` — `chore: adiciona estrutura DevOps conforme PGC v1.0`

---

## 3. Evidência da Recusa do Push Direto na Main

Tentativa de `git push origin main` diretamente (sem Pull Request) resultou em rejeição pelo GitHub:

```
remote: error: GH006: Protected branch update failed for refs/heads/main.
remote:
remote: - Changes must be made through a pull request.
remote:
remote: - 3 of 3 required status checks are expected.
To https://github.com/matheusoliv19/autoprime-web.git
 ! [remote rejected] main -> main (protected branch hook declined)
error: failed to push some refs to 'https://github.com/matheusoliv19/autoprime-web.git'
```

**Captura de tela:** `evidencia.png`

### Configuração da Branch Protection (main)

| Regra | Valor |
|---|---|
| Require pull request before merging | ✅ Ativo |
| Required approving reviews | 1 |
| Dismiss stale reviews | ✅ Ativo |
| Require status checks to pass | ✅ Ativo |
| Status checks obrigatórios | Lint HTML/CSS/JS, Verificação de Links, Verificação de Segredos |
| Enforce for administrators | ✅ Ativo |
| Allow force pushes | ❌ Bloqueado |
| Allow deletions | ❌ Bloqueado |

---

## 4. Par de Revisão com Acesso de Escrita

| Colaborador | Permissão | Papel |
|---|---|---|
| `matheusoliv19` | admin | Gerente / Desenvolvedor principal |
| `oliverco1905-source` | write | Par de revisão |

**URL:** https://github.com/matheusoliv19/autoprime-web/settings/access

---

## 5. Environments: Staging e Production

### Environment: staging
- Sem revisor obrigatório — deploy automático após merge na `main`
- Gatilho: push na branch `staging` após pipeline de CI aprovado

### Environment: production
- **Revisor obrigatório:** `matheusoliv19`
- Tipo de proteção: `required_reviewers`
- Gatilho: criação de tag `vX.Y.Z`
- Deploy bloqueado até aprovação manual do revisor

**URL:** https://github.com/matheusoliv19/autoprime-web/settings/environments

---

## 6. Branches Configuradas

| Branch | Finalidade |
|---|---|
| `main` | Produção — protegida, sempre deployável |
| `staging` | Homologação — validação visual |
| `gh-pages-staging` | GitHub Pages do ambiente de staging |

---

## 7. Pipelines CI/CD

### Pipeline de CI (`.github/workflows/ci.yml`)
- Disparado em todo PR para `main` ou `staging`
- Jobs: Lint HTML, Lint CSS, Lint JS, verificação de links, verificação de segredos

### Pipeline de CD (`.github/workflows/deploy.yml`)
- Deploy para staging: disparado no push para `main`
- Deploy para produção: disparado na criação de tag `vX.Y.Z`
- Gera GitHub Release automática com changelog

**URL:** https://github.com/matheusoliv19/autoprime-web/actions
