import { getHeaderList } from '../support/app.po';

describe('my-lottery', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    // Custom command example, see `../support/commands.ts` file
    // cy.login('my-email@something.com', 'myPassword');

    // Function helper example, see `../support/app.po.ts` file
    // getGreeting().contains('Welcome my-lottery');
    getHeaderList().find('li').should('have.length', 3);
  });
});
