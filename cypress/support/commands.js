Cypress.Commands.add('fillMandatoryFieldsSubmit', data => {
    // Preenche os campos obrigatórios
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.text)

    // Envia o formulário
    cy.contains('button', 'Enviar').click()
})