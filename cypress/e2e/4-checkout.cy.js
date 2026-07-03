// Cenário 4: Fluxo completo de compra (checkout)
describe('Checkout', () => {
  beforeEach(() => {
    cy.login();
    cy.addToCart('Sauce Labs Backpack');
    cy.addToCart('Sauce Labs Fleece Jacket');
    cy.get('.shopping_cart_link').click();
    cy.get('[data-test="checkout"]').click();
  });

  it('deve exigir os dados do comprador', () => {
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="error"]').should('contain', 'First Name is required');
  });

  it('deve concluir uma compra com sucesso', () => {
    cy.fixture('checkout').then((dados) => {
      cy.get('[data-test="firstName"]').type(dados.firstName);
      cy.get('[data-test="lastName"]').type(dados.lastName);
      cy.get('[data-test="postalCode"]').type(dados.postalCode);
    });
    cy.get('[data-test="continue"]').click();

    // Resumo do pedido: confere itens e total
    cy.url().should('include', '/checkout-step-two.html');
    cy.get('.cart_item').should('have.length', 2);
    cy.get('.summary_subtotal_label').should('contain', '$79.98'); // 29.99 + 49.99
    cy.get('.summary_total_label').should('contain', '$');
    cy.screenshot('checkout-resumo');

    cy.get('[data-test="finish"]').click();
    cy.url().should('include', '/checkout-complete.html');
    cy.get('.complete-header').should('have.text', 'Thank you for your order!');
    cy.screenshot('checkout-concluido');
  });

  it('deve calcular o total como subtotal + imposto', () => {
    cy.get('[data-test="firstName"]').type('Teste');
    cy.get('[data-test="lastName"]').type('CCH');
    cy.get('[data-test="postalCode"]').type('12345');
    cy.get('[data-test="continue"]').click();

    cy.get('.summary_subtotal_label').then(($sub) => {
      const subtotal = parseFloat($sub.text().replace('Item total: $', ''));
      cy.get('.summary_tax_label').then(($tax) => {
        const imposto = parseFloat($tax.text().replace('Tax: $', ''));
        cy.get('.summary_total_label').should('contain', `$${(subtotal + imposto).toFixed(2)}`);
      });
    });
  });

  it('deve permitir cancelar o checkout', () => {
    cy.get('[data-test="cancel"]').click();
    cy.url().should('include', '/cart.html');
    cy.get('.cart_item').should('have.length', 2);
  });
});
