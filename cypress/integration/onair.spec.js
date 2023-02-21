

it('webapp deve estar online', () => {
    //Um simples comentário
    cy.visit('/')

    cy.title()
        .should('eq','Samurai Barbershop by QAninja')
});
