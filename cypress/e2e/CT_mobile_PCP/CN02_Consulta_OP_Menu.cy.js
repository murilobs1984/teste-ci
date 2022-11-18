///<reference types="cypress" />

// AUTOR........: Murilo Beckhauser de Souza;
// DATA.........: 06/05/2022
// INFORMAÇÕES..: Esta automação realiza o apontamento da OP 1010, via apontamento HTML
// O cenário começa clicando em Busca Avançada, onde filtra pelas OPs de 1002 à 1010, na data de 01/01/2019 à 10/05/2022, para o
// estabelecimento MBS, desmarcando as OPs com situação de Reservada e Separada.
// O apontamento realizado é de 10,2500, refugando a quantidade de 8,2500, deixando no final um percentual de produção igual a 10,3%
// A OP possui a Linha de Produção do tipo SERVIÇO.

describe('Apontamento de Produção HTML', () => {

  it('Apontamento simples html PCP', () => {

    cy.loginAptoHtml()  //esta customização está em commands

    cy.contains('Busca Avançada').click()
    cy.get('.toast-title').click() //Clica na mensagem "Último acesso do usuário super"
    cy.intercept('POST', '**/resources/api/fch/fchman/**').as('postFiltro')
    cy.get('input[name*="controller_advancedsearch.prodordercodeini"]').type('{selectall}1002')
    cy.get('input[name*="controller_advancedsearch.prodordercodefin"]').type('{selectall}1010')
    cy.get('input[name*="controller_advancedsearch.sitecode"]').type('{selectall}MBS')
    cy.get('div[name*="controller_advancedsearch.inidate"]').type('{selectall}01/01/2019')
    cy.get('div[name*="controller_advancedsearch.enddate"]').type('{selectall}10/05/2022')
    cy.get('div[name*="controller_advancedsearch.emissiondateini"]').type('{selectall}01/01/2019')
    cy.get('div[name*="controller_advancedsearch.emissiondatefin"]').type('{selectall}10/05/2022')
    cy.contains('Situação').click()
    cy.contains('Reservada').click()
    cy.contains('Separada').click()
    cy.contains('button', 'Pesquisa').click()
    cy.get('div').should('contain', '1.003') //Assert
    cy.get('div').should('contain', '1.005') //Assert
    cy.get('div').should('contain', '1.010') //Assert
    cy.get('input[placeholder*="Pendência"]').type('1010{enter}')
    cy.get('[type="submit"] > .glyphicon').click()  //Clica no botão de Filtro
    cy.contains('span', '▼ Exibir detalhes').click()
    cy.wait('@postFiltro').its('response.body').should('property','length', null) //Assert
    cy.get('.col-lg-5 > .btn-group > .btn').click() // Clicar em Apontar
    cy.intercept('GET', '**/mcp/html/productionappointmentadd/**').as('getApontar')
    //cy.wait('@getApontar').its('response.body').should('property','length', 0) //Assert
    cy.get('input[name*="controller_ttreporte_reportdate"]').type('{selectall}06052022')
    cy.get('input[name*="controller_ttreporte_qtdprod"]').type('{selectall}10,2500')
    cy.get('input[name*="controller_ttreporte_qtdscrap"]').type('{selectall}8,2500')
    cy.get('.btn-primary').click() //Clica no botão Salvar
    cy.wait('@postFiltro').its('response.body').should('property','length', null) //Assert
    cy.get('a').should('contain', '10,3%') //Percentual Produzido
    cy.get('div').should('contain', 'Sucesso') //Assert
    cy.get('div').should('contain', 'Apontamento realizado com Sucesso') //Assert

  })
})

