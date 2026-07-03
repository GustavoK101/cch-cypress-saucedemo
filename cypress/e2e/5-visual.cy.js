// Cenário 5: Aparência visual das principais telas
describe('Aparência visual', () => {
  it('tela de login deve exibir logo e formulário', () => {
    cy.visit('/');
    cy.get('.login_logo').should('be.visible').and('have.text', 'Swag Labs');
    cy.get('[data-test="username"]').should('be.visible');
    cy.get('[data-test="password"]').should('be.visible');
    cy.get('[data-test="login-button"]')
      .should('be.visible')
      .and('have.css', 'background-color', 'rgb(61, 220, 145)'); // botão verde
    cy.screenshot('visual-login');
  });

  it('cabeçalho da loja deve exibir logo, menu e carrinho', () => {
    cy.login();
    cy.get('.app_logo').should('be.visible');
    cy.get('#react-burger-menu-btn').should('be.visible');
    cy.get('.shopping_cart_link').should('be.visible');
    cy.screenshot('visual-inventario');
  });

  it('deve renderizar corretamente em viewport mobile', () => {
    cy.viewport('iphone-x');
    cy.login();
    cy.get('.inventory_item').should('have.length', 6).and('be.visible');
    cy.get('#react-burger-menu-btn').should('be.visible');
    cy.screenshot('visual-mobile');
  });

  it('rodapé deve exibir redes sociais e copyright', () => {
    cy.login();
    cy.get('footer').scrollIntoView();
    cy.get('[data-test="social-twitter"]').should('be.visible');
    cy.get('[data-test="social-facebook"]').should('be.visible');
    cy.get('[data-test="social-linkedin"]').should('be.visible');
    cy.get('.footer_copy').should('contain', 'Sauce Labs');
  });
});
