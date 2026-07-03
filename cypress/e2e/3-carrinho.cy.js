// Cenário 3: Carrinho de compras (adicionar e remover itens)
describe('Carrinho de compras', () => {
  beforeEach(() => {
    cy.login();
  });

  it('deve adicionar um item ao carrinho e atualizar o contador', () => {
    cy.addToCart('Sauce Labs Backpack');
    cy.get('.shopping_cart_badge').should('have.text', '1');
    cy.screenshot('item-adicionado');
  });

  it('deve adicionar múltiplos itens e listá-los no carrinho', () => {
    cy.addToCart('Sauce Labs Backpack');
    cy.addToCart('Sauce Labs Bike Light');
    cy.addToCart('Sauce Labs Onesie');
    cy.get('.shopping_cart_badge').should('have.text', '3');

    cy.get('.shopping_cart_link').click();
    cy.url().should('include', '/cart.html');
    cy.get('.cart_item').should('have.length', 3);
    cy.contains('.cart_item', 'Sauce Labs Backpack').should('exist');
    cy.screenshot('carrinho-multiplos-itens');
  });

  it('deve remover um item do carrinho', () => {
    cy.addToCart('Sauce Labs Backpack');
    cy.addToCart('Sauce Labs Bike Light');
    cy.get('.shopping_cart_link').click();

    cy.contains('.cart_item', 'Sauce Labs Backpack').find('button').contains('Remove').click();
    cy.get('.cart_item').should('have.length', 1);
    cy.get('.shopping_cart_badge').should('have.text', '1');
  });

  it('deve permitir continuar comprando a partir do carrinho', () => {
    cy.get('.shopping_cart_link').click();
    cy.get('[data-test="continue-shopping"]').click();
    cy.url().should('include', '/inventory.html');
  });
});
