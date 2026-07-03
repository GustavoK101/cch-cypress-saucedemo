// Comandos customizados reutilizados pelos testes

// Faz login com o usuário informado (padrão: standard_user)
Cypress.Commands.add('login', (username = 'standard_user', password = 'secret_sauce') => {
  cy.visit('/');
  cy.get('[data-test="username"]').type(username);
  cy.get('[data-test="password"]').type(password);
  cy.get('[data-test="login-button"]').click();
});

// Adiciona um produto ao carrinho pelo nome
Cypress.Commands.add('addToCart', (productName) => {
  cy.contains('.inventory_item', productName)
    .find('button')
    .contains('Add to cart')
    .click();
});
