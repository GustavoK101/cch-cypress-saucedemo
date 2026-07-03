# CCH – Teste de Software: Automação de front-end com Cypress

Testes automatizados de front-end do site **Swag Labs (Sauce Demo)** — <https://www.saucedemo.com> — desenvolvidos para o trabalho da disciplina CCH – Teste de Software.

## Site escolhido

O [Sauce Demo](https://www.saucedemo.com) é uma loja virtual de demonstração mantida pela Sauce Labs. Ele possui login, catálogo de produtos, carrinho e fluxo completo de checkout, além de usuários de teste com comportamentos distintos (ex.: `locked_out_user`), o que o torna ideal para automação de testes.

Credenciais utilizadas (públicas, exibidas na própria tela de login):

- Usuário: `standard_user` (e `locked_out_user` para o cenário de bloqueio)
- Senha: `secret_sauce`

## Cenários de teste

| Spec | Cenário | Casos |
|------|---------|-------|
| `1-login.cy.js` | Autenticação | login válido, senha inválida, usuário bloqueado, campos obrigatórios, logout |
| `2-inventory.cy.js` | Catálogo | listagem dos 6 produtos, ordenação por preço e por nome, página de detalhes |
| `3-carrinho.cy.js` | Carrinho | adicionar item, múltiplos itens, remover item, continuar comprando |
| `4-checkout.cy.js` | Compra | dados obrigatórios, compra completa, cálculo de subtotal + imposto, cancelamento |
| `5-visual.cy.js` | Aparência visual | tela de login, cabeçalho, viewport mobile, rodapé |

## Como executar

```bash
npm install          # instala o Cypress
npm test             # executa todos os testes em modo headless
npm run cy:open      # abre a interface interativa do Cypress
```

Capturas de tela são geradas em `cypress/screenshots/` e vídeos em `cypress/videos/`.

## Estrutura

```
cypress/
  e2e/               # specs de teste
  fixtures/          # dados de teste (checkout.json)
  support/
    commands.js      # comandos customizados (cy.login, cy.addToCart)
cypress.config.js    # configuração (baseUrl, viewport, vídeo)
```

## Melhorias e otimizações aplicadas

- **Comandos customizados** (`cy.login`, `cy.addToCart`) eliminam repetição entre os specs.
- **Seletores `data-test`** (em vez de classes CSS) tornam os testes resistentes a mudanças de layout.
- **Fixtures** separam dados de teste da lógica dos scripts.
- **`baseUrl` centralizada** no `cypress.config.js` facilita apontar para outro ambiente.

Possíveis evoluções: login via `cy.session()` para acelerar a suíte, testes com o usuário `performance_glitch_user`, integração com CI (GitHub Actions) e comparação visual automatizada (ex.: plugin `cypress-image-diff`).
