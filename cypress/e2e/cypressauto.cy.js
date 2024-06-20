describe('Sweet Shop Tests', () => {
  beforeEach(() => {
    cy.visit('https://sweetshop.netlify.app/');
  });

  it('should add products to the basket', () => {
    cy.get('a.btn.btn-success.btn-block.addItem').as('addToBasketButton');
    cy.get('a[data-name="Sherbet Discs"]').click();
    cy.get('a[data-name="Sherbet Discs"]').click();
    cy.get('a[data-name="Sherbert Straws"]').click();
    cy.get('a[data-name="Chocolate Cups"]').click();
    cy.get('a[href="/basket"]').click();
    cy.get('ul[id="basketItems"]').should('contain.text', 'Sherbet Discs');
    cy.get('ul[id="basketItems"]').should('contain', 'Sherbert Straws');
    cy.get('ul[id="basketItems"]').should('contain', 'Chocolate Cups');
    let totalPrice = 0;
    cy.get('ul[id="basketItems"] li').each(($el, index, $list) => {
      const quantity = parseInt($el.find('small[class="text-muted"]').text());
      const price = parseFloat($el.find('span[class="text-muted"]').text().replace('£', ''));
      totalPrice += quantity * price;
    }).then(() => {
      cy.get('strong').invoke('text').then((text) => {
        const displayedTotalPrice = parseFloat(text.replace('Total: £', ''));
        expect(displayedTotalPrice).to.equal(totalPrice);    
      });
    });
    cy.get('label[for="exampleRadios2"]').click();
    cy.get('strong').invoke('text').then((text) => {
      expect(text).to.equal("£NaN");    
    });
    cy.get('input[id="name"]').eq(0).type("Keerthana");
    cy.get('input[id="name"]').eq(1).type("D R");
    cy.get('input[id="email"]').type("keerthanadr1096@gmail.com");
    cy.get('input[id="address"]').type("abcd");
    cy.get('input[id="country"]').select("United Kingdom");
    cy.get('input[id="city"]').select("Bristol");
    cy.get('input[id="zip"]').type("12345");
    cy.get('input[id="cc-name"]').type("Keerthana");
    cy.get('input[id="cc-number"]').type("Keerthana");
    cy.get('input[id="cc-expiration"]').type("Keerthana");
    cy.get('input[id="cc-cvv"]').type("Keerthana");
    cy.get('input[id="name"]').eq(1).click();
  });
});
