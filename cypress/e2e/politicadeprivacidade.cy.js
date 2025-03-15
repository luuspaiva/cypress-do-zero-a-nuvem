describe('Política de Privacidade', () => {
    it('valida o título da página', () => {
        cy.visit('./src/privacy.html');
        cy.title()
        .should('eq', 'Central de Atendimento ao Cliente TAT - Política de Privacidade');
    });
});



