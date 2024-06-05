function login(user = 'HROnly', password = 'abcdef123') {
  cy.visit('localhost:3000');
  cy.get('#username').type(user);
  cy.get('#password').type(password);
  cy.get('.MuiButtonBase-root').click();
  cy.url().should('contain', '/explore')
}

describe('Testing all user flows', () => {

  it('Check for deleting user', () => {
    
    // Logging in
    login();
    
    // Deletion of user
    cy.get(':nth-child(4) > .MuiButtonBase-root').click();
    cy.get(':nth-child(2) > .mui-m69qwo-MuiStack-root > button.MuiButtonBase-root > [data-testid="DeleteIcon"] > path').click();
    cy.get('.MuiButton-outlined').click();
    cy.get('.MuiPaper-root').should('be.visible');
    cy.get('.MuiSnackbarContent-message').should('have.text', 'Delete Success!');
    cy.get('[data-testid="CloseIcon"]').click();
    // cy.screenshot('deletedUser')
    cy.matchImageSnapshot('deletedUser')
  })

  it('Check for editing a user', () => {

    login()

    // Editing a user
    cy.get(':nth-child(2) > .mui-m69qwo-MuiStack-root > a.MuiButtonBase-root > [data-testid="EditIcon"] > path').click();
    cy.get('#\\:Rcqkvffacq\\:').click();
    cy.get('#\\:Rcqkvffacq\\:').should('have.value', 'Lucind');
    cy.get('#\\:R1akvffacq\\:').should('have.value', '2970');
    cy.get('.MuiTypography-body2').should('have.text', 'HR');
    cy.get('#\\:Rcqkvffacq\\:').clear();
    cy.get('#\\:Rcqkvffacq\\:').type('Lil Wayne Roonie');
    cy.get('#\\:R1akvffacq\\:').clear();
    cy.get('#\\:R1akvffacq\\:-helper-text').should('have.text', 'Salary must be more than 0');
    cy.get('#\\:R1akvffacq\\:').type('654321');
    cy.get('.MuiTypography-body2').click();
    cy.get('.MuiList-root > [tabindex="-1"]').click();
    cy.get('.MuiBox-root > .MuiButton-root').click();
    cy.get('.MuiPaper-root').should('be.visible');
    cy.get('.MuiSnackbarContent-message').should('have.text', 'Success!');
    cy.get('[data-testid="CloseIcon"]').click();

    cy.clearAllCookies()

    login('test', 'abc123');
    // cy.screenshot('PS')
    cy.matchImageSnapshot('PS')
  })

  it('Check for adding a new user', () => {

    login('E2E', 'cypress');
    cy.get('.mui-1526y3d-MuiContainer-root > .MuiButtonBase-root').click();
    cy.get('#\\:Rcqkvffacq\\:-helper-text').should('have.text', 'Name must be 4 - 30 characters long');
    cy.get('#\\:Rcqkvffacq\\:').type('Cypress');
    cy.get('#\\:R1akvffacq\\:').clear();
    cy.get('#\\:R1akvffacq\\:').type('6969');
    cy.get('.MuiTypography-body2').click();
    cy.get('.Mui-selected').click();
    cy.get('.MuiBox-root > .MuiButton-root').click();


    // Checking if available
    cy.visit('http://localhost:3000/explore?page=3')
    cy.get('.MuiTypography-h5').should('have.text', 'Cypress')
    cy.get('.mui-1w37ujc-MuiStack-root > :nth-child(2)').should('have.text', 'HR')
    cy.get('.mui-1w37ujc-MuiStack-root > :nth-child(3)').should('have.text', '$6,969')

  })
})