describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    // Busca o titulo e verifica se é igual ao esperado
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })

  it('Preencher campos obrigatórios e enviar formulário', () => {
    const longText = Cypress._.repeat('teste', 100)
    // Preenche os campos obrigatórios
    cy.get('#firstName').type('Lucas')
    cy.get('#lastName').type('Teste')
    cy.get('#email').type('lucas@teste.com')
    cy.get('#open-text-area').type(longText, { delay: 0 })

    // Envia o formulário
    cy.contains('button', 'Enviar').click()

    // Valida mensagem de sucesso
    cy.get('.success').should('contain', 'Mensagem enviada com sucesso.')
  })

  it('Erro ao enviar formulário com e-mail errado', () => {
    const longText = Cypress._.repeat('teste', 10)
    // Preenche os campos obrigatórios
    cy.get('#firstName').type('Lucas')
    cy.get('#lastName').type('Teste')
    cy.get('#email').type('lucas!teste.com')
    cy.get('#open-text-area').type(longText, { delay: 0 })

    // Envia o formulário
    cy.contains('button', 'Enviar').click()

    // Valida mensagem de erro
    cy.get('.error').should('contain', 'Valide os campos obrigatórios!')
  })

  it('validar campo telefone vazio após preencher com valores não-númericos', () => {
    // Preenche o campo telefone com valores não-numéricos
    cy.get('#phone').type('teste')

    // Valida se o campo está vazio
    cy.get('#phone').should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    // Preenche os campos obrigatórios
    cy.get('#firstName').type('Lucas')
    cy.get('#lastName').type('Teste')
    cy.get('#email').type('lucas@teste.com')
    cy.get('#open-text-area').type('testeteste')

    // Clica no campo Telefone obrigatório
    cy.get('#phone-checkbox').check()

    // Envia formulário
    cy.contains('button', 'Enviar').click()

    // Valida mensagem de erro
    cy.get('.error').should('contain', 'Valide os campos obrigatórios!')
  })

  it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    // Preenche os campos obrigatórios
    cy.get('#firstName').type('Lucas')
    cy.get('#lastName').type('Teste')
    cy.get('#email').type('lucas@teste.com')
    cy.get('#phone').type('123456789')
    cy.get('#open-text-area').type('testeteste')

    // Valida se os campos estão preenchidos
    cy.get('#firstName').should('have.value', 'Lucas')
    cy.get('#lastName').should('have.value', 'Teste')
    cy.get('#email').should('have.value', 'lucas@teste.com')
    cy.get('#phone').should('have.value', '123456789')
    cy.get('#open-text-area').should('have.value', 'testeteste')

    // Limpa todos os campos
    cy.get('#firstName').clear()
    cy.get('#lastName').clear()
    cy.get('#email').clear()
    cy.get('#phone').clear()
    cy.get('#open-text-area').clear()

    // Valida se os campos estão vazios
    cy.get('#firstName').should('have.value', '')
    cy.get('#lastName').should('have.value', '')
    cy.get('#email').should('have.value', '')
    cy.get('#phone').should('have.value', '')
    cy.get('#open-text-area').should('have.value', '')
  })

  it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    // Clica no botão de enviar formulário
    cy.contains('button', 'Enviar').click()
    // Valida mensagem de erro
    cy.get('.error').should('contain', 'Valide os campos obrigatórios!')
  })

  it('Envia o formulário com sucesso usando um comando customizado', () => {
    const data = {
      firstName: 'Diogo',
      lastName: 'Silva',
      email: 'diogosilva@teste.com',
      text: 'Teste, Teste123.'
    }
    cy.fillMandatoryFieldsSubmit(data)

    cy.get('.success').should('be.visible')
  })

  it('Seleciona o produto Youtube', () => {
    // Seleciona o produto Youtube
    cy.get('#product').select('YouTube')

    // Valida se o produto Youtube foi selecionado
    cy.get('#product').should('have.value', 'youtube')
  })

  it('Seleciona o produto Mentoria pelo seu value', () => {
    // Seleciona o produto Mentoria
    cy.get('#product').select('mentoria')

    // Valida se o produto Mentoria foi selecionado
    cy.get('#product').should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    // Seleciona o produto Blog
    cy.get('#product').select(1)

    // Valida se o produto Blog foi selecionado
    cy.get('#product').should('have.value', 'blog')
  })

  it('Marca o tipo de atendimento Feedback', () => {
    // Marca o tipo de atendimento Feedback
    cy.get('input[type="radio"][value="feedback"]').check()

    // Valida se o tipo de atendimento Feedback foi marcado
    cy.get('input[type="radio"][value="feedback"]').should('be.checked')
  })

  it('Marca cada tipo de atendimento', () => {
    // Marca todos os tipos de atendimento usando .each e .wrap
    cy.get('input[type="radio"]').each(($el) => {
      cy.wrap($el).check()
      cy.wrap($el).should('be.checked')
    })
  })

  it('Marca ambos checkboxes, depois desmarca o último', () => {
    // Marca ambos checkboxes
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('Seleciona um arquivo da pasta', () => {
    // Seleciona o arquivo
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json') //.selectFile só busca inputs do tipo file
      .should(($el) => { //should recebendo uma função de callback
        expect($el[0].files[0].name).to.eq('example.json')
      })
  })

  it('Seleciona um arquivo simulando o drag and drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' }) //passa como segundo argumento um objeto com a propriedade action e o valor 'drag-drop'
      .should(($el) => {
        expect($el[0].files[0].name).to.eq('example.json')
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('file') //cria um alias para a fixture
    cy.get('#file-upload')
      .selectFile('@file') //para chamar um alias, utilizamos o @
      .should(($el) => {
        expect($el[0].files[0].name).to.eq('example.json')
      })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')

  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()
    
    cy.contains('h1', 'CAC TAT - Política de Privacidade')
      .should('be.visible')
  })
})