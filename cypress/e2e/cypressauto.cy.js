describe('Sweet Shop Tests', () => {
  beforeEach(() => {
    // Visit the Sweet Shop website before each test
    cy.visit('https://sweetshop.netlify.app/');
  });

  it('should add products to the basket and checkout', () => {
    // Click on the 'Sweets' link
    cy.get('a[href="/sweets"]').eq(1).click();

    // Add specific products to the basket
    cy.get('a[data-name="Sherbet Discs"]').click();
    cy.get('a[data-name="Jellies"]').click();
    cy.get('a[data-name="Sherbert Straws"]').click();
    cy.get('a[data-name="Chocolate Cups"]').click();

    // Go to the basket page
    cy.get('a[href="/basket"]').click();

    // Verify that each added product appears in the basket
    cy.get('ul[id="basketItems"]').should('contain.text', 'Sherbet Discs');
    cy.get('ul[id="basketItems"]').should('contain', 'Sherbert Straws');
    cy.get('ul[id="basketItems"]').should('contain', 'Chocolate Cups');
    cy.get('ul[id="basketItems"]').should('contain', 'Jellies');

    let totalPrice = 0;

    // Iterate over each item in the basket (excluding the last item)
    cy.get('ul[id="basketItems"] li').each(($el, index, $list) => {
      if (index < $list.length - 1) {
        // Extract quantity and price from each item
        const quantity = parseInt($el.find('small[class="text-muted"]').text().replace('x ', ''));
        const price = parseFloat($el.find('span[class="text-muted"]').text().replace('£', ''));
        
        // Calculate total price
        totalPrice += quantity * price;
      }
    }).then(() => {
      // Assert total price displayed matches calculated total price
      cy.get('strong').invoke('text').then((text) => {
        const displayedTotalPrice = parseFloat(text.replace('£', ''));
        cy.log(displayedTotalPrice);
        expect(displayedTotalPrice).to.equal(totalPrice);
      });

      // Proceed to checkout
      cy.get('label[for="exampleRadios2"]').click();
      
      // Validate that the displayed total price is '£NaN'
      cy.get('strong').invoke('text').then((text) => {
        expect(text).to.equal("£NaN");
      });

      // Filling out checkout form with personal and payment details
      cy.get('input[id="name"]').eq(0).type("Keerthana");
      cy.get('input[id="name"]').eq(1).type("D R");
      cy.get('input[id="email"]').type("keerthanadr1096@gmail.com");
      cy.get('input[id="address"]').type("abcd");
      cy.get('select[id="country"]').select("United Kingdom");
      cy.get('select[id="city"]').select("Bristol");
      cy.get('input[id="zip"]').type("12345");
      cy.get('input[id="cc-name"]').type("Keerthana");
      cy.get('input[id="cc-number"]').type("Keerthana");
      cy.get('input[id="cc-expiration"]').type("Keerthana");
      cy.get('input[id="cc-cvv"]').type("1234");
      
      // Submit the checkout form
      cy.get('button[type="submit"]').eq(1).click();
    });
  });
});
