describe('Política de Privacidade', () => {
    it.only('valida o título da página', () => {
        cy.visit('./src/privacy.html')
        cy.title()
        .should('eq', 'Central de Atendimento ao Cliente TAT - Política de Privacidade')
    });
})



