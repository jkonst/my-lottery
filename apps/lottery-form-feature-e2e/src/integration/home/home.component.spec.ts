describe('lottery-form-feature', () => {
  beforeEach(() => cy.visit('/iframe.html?id=homecomponent--primary'));
  it('should render the component', () => {
    cy.get('app-home').should('exist');
  });
});
