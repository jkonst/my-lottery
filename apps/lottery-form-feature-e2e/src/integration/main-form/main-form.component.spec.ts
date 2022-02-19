describe('lottery-form-feature', () => {
  beforeEach(() => cy.visit('/iframe.html?id=mainformcomponent--primary'));
  it('should render the component', () => {
    cy.get('app-main-form').should('exist');
  });
});