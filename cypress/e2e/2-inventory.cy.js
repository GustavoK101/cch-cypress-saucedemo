// Cenário 2: Catálogo de produtos (listagem, ordenação e detalhes)
describe('Catálogo de produtos', () => {
  beforeEach(() => {
    cy.login();
  });

  it('deve listar 6 produtos com nome, preço e imagem', () => {
    cy.get('.inventory_item').should('have.length', 6);
    cy.get('.inventory_item').each(($item) => {
      cy.wrap($item).find('.inventory_item_name').should('not.be.empty');
      cy.wrap($item).find('.inventory_item_price').should('contain', '$');
      cy.wrap($item).find('img.inventory_item_img').should('be.visible');
    });
  });

  it('deve ordenar produtos por preço crescente', () => {
    cy.get('[data-test="product-sort-container"]').select('lohi');
    cy.get('.inventory_item_price').then(($prices) => {
      const valores = [...$prices].map((el) => parseFloat(el.innerText.replace('$', '')));
      const ordenados = [...valores].sort((a, b) => a - b);
      expect(valores).to.deep.equal(ordenados);
    });
    cy.screenshot('ordenacao-preco-crescente');
  });

  it('deve ordenar produtos por nome de Z a A', () => {
    cy.get('[data-test="product-sort-container"]').select('za');
    cy.get('.inventory_item_name').then(($nomes) => {
      const nomes = [...$nomes].map((el) => el.innerText);
      const ordenados = [...nomes].sort().reverse();
      expect(nomes).to.deep.equal(ordenados);
    });
  });

  it('deve abrir a página de detalhes do produto', () => {
    cy.contains('.inventory_item_name', 'Sauce Labs Backpack').click();
    cy.url().should('include', '/inventory-item.html');
    cy.get('.inventory_details_name').should('have.text', 'Sauce Labs Backpack');
    cy.get('.inventory_details_price').should('contain', '$');
    cy.screenshot('detalhes-produto');
  });
});
