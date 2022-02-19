describe('lottery-form-feature', () => {
  beforeEach(() => cy.visit('/iframe.html?id=fileuploadcomponent--primary&args=fileType;hasErrorOnType:false;'));
  it('should render the component', () => {
    cy.get('app-file-upload').should('exist');
  });
});