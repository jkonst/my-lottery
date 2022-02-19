describe('lottery-form-feature', () => {
  beforeEach(() => cy.visit('/iframe.html?id=winnerscomponent--primary'));
  it('should render the component', () => {
    cy.get('app-winners').should('exist');
  });
});