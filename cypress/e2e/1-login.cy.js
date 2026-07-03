// Cenário 1: Autenticação (login e logout)
describe('Login', () => {
  it('deve fazer login com credenciais válidas', () => {
    cy.login();
    cy.url().should('include', '/inventory.html');
    cy.get('.title').should('have.text', 'Products');
    cy.screenshot('login-sucesso');
  });

  it('deve exibir erro com senha inválida', () => {
    cy.login('standard_user', 'senha_errada');
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Username and password do not match');
    cy.screenshot('login-senha-invalida');
  });

  it('deve exibir erro para usuário bloqueado', () => {
    cy.login('locked_out_user');
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Sorry, this user has been locked out');
    cy.screenshot('login-usuario-bloqueado');
  });

  it('deve exigir usuário e senha', () => {
    cy.visit('/');
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="error"]').should('contain', 'Username is required');
  });

  it('deve fazer logout e voltar para a tela de login', () => {
    cy.login();
    cy.get('#react-burger-menu-btn').click();
    cy.get('#logout_sidebar_link').click();
    cy.url().should('eq', 'https://www.saucedemo.com/');
    cy.get('[data-test="login-button"]').should('be.visible');
  });
});
