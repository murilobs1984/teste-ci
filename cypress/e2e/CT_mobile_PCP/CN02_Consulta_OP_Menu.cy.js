///<reference types="cypress" />

// AUTOR........: Murilo Beckhauser de Souza;
// DATA.........: 25/03/2022;
// INFORMAÇÕES..: O Objetivo deste teste é realizar a consulta de OP através do Menu Lateral " Consulta de O.P."
// 1 - O cenário clica em Consulta de O.P / Clica em Busca Avançada / Informa o item MBS001-a e a data entre 01/01/2018 à 31/12/2021 /
// clica em Aplicar / Na OP 858 clica em Detalhar / clica na seta Voltar, no cabeçalho da tela / clica no botão LIMPAR / clica na seta
// Voltar / clica novamente no Menu / Clica novamente em Consulta de O.P / Clica no "X", onda vai eliminar a OP 858 / Informa a OP 872
// no campo de pesquisa e clica na Lupa / Na OP 872 clica em Detalhar / clica na seta Voltar, no cabeçalho da tela / clica na seta Voltar,
// no cabeçalho da tela novamente / Clica novamente no Menu / Clica novamente em Consulta de O.P / Em últimas Ordens Consultadas, clica na
// OP 872 / clica em Apontamentos / Após apresentas os apontamentos, clica na Seta Volta no cabeçalho da tela.

describe('app_minha_producao', () => {

  it('Consulta de OP através do Menu', () => {

    //cy.tamanhoTelaParaMobile()
    //cy.Config() //esta customização está em commands
    //cy.Login()  //esta customização está em commands
    cy.visit('http://embau:8480/totvs-login/loginForm')

    cy.intercept('POST', '**/api/cpp/v1/productionMobile/**').as('postMenu')
    cy.get('ion-menu-button').click() //Clica no botão Menu
    cy.get('.center').click() //Clica no logo da Totvs
    cy.contains('Consulta de O.P.').click()
    cy.contains('Busca Avançada').click()
    cy.wait('@postMenu')
    cy.get('input[name*="itemCode"]').type('mbs001-a')
    cy.get('input[name*="startDateRange"]').type('{selectall}01012018')
    cy.get('input[name*="endDateRange"]').type('{selectall}31122021')
    cy.contains('Aplicar').click()
    cy.contains('858').click()
    cy.get('.ng-star-inserted.ion-page > .header-md > .toolbar-title-default > .buttons-first-slot > .md').click() //Clica na seta de Voltar no cabeçalho
    cy.contains('Limpar').click()
    cy.get('app-production-query-datasul.ion-page > .header-md > .toolbar-title-default > .buttons-first-slot > .md').click() //Clica na seta de Voltar no cabeçalho
    cy.get('app-form-list-datasul.ion-page > .header-md > .toolbar-title-default > .buttons-last-slot > .button').click() //Clica na Seta de Atualizar no cabeçalho
    cy.get('ion-menu-button').click() //Clica no botão Menu
    cy.get('.center').click() //Clica no logo da Totvs
    cy.contains('Consulta de O.P.').click()
    cy.get('.icon-red').click() //Clica no "X", para deletar a OP 858
    cy.wait('@postMenu')
    cy.get('input[placeholder*="Informe a OP ou o Item"]').type('872')
    cy.get('po-icon[ng-reflect-icon*="po-icon-search"]').click() //Clica na Lupa
    cy.contains('Detalhar').click()
    cy.get('app-production-order-detail.ng-star-inserted > .header-md > .toolbar-title-default > .buttons-first-slot > .md').click() //Clica na seta de Voltar no cabeçalho
    cy.contains('Limpar').click()
    cy.get('.ng-star-inserted.ion-page > .header-md > .toolbar-title-default > .buttons-first-slot > .md').click() //Clica na seta de Voltar no cabeçalho
    cy.get('app-form-list-datasul.ion-page > .header-md > .toolbar-title-default > .buttons-last-slot > .button').click() //Clica na Seta de Atualizar no cabeçalho
    cy.get('ion-menu-button').click() //Clica no botão Menu
    cy.get('.center').click() //Clica no logo da Totvs
    cy.wait('@postMenu')
    cy.contains('Consulta de O.P.').click()
    cy.contains('MBS002-a').click()
    cy.intercept('GET', '**/joisrvapldev001:8180/api/cpp/**').as('getApontamentos')
    cy.contains('Visualização Resumida').click()
    cy.get('po-info').should('contain', 'Item: MBS002-a')
    cy.get('po-info').should('contain', 'Qtde Prevista: 100,0000')
    cy.get('po-info').should('contain', 'Qtde Prod: 90,0000')
    cy.get('po-info').should('contain', 'Qtde Refug: 9,0000')
    cy.get('po-info').should('contain', 'Início: 16/05/2019')
    cy.get('po-info').should('contain', 'Unidade de Negócio: 99')
    cy.get('po-info').should('contain', 'Estabelecimento: MBS')
    cy.get('po-info').should('contain', 'Lote/Série: MBS.000872')
    cy.get('po-info').should('contain', 'Referência: Azul')
    cy.get('po-info').should('contain', 'Planejador: Murilo')
    cy.contains('po-button', 'Apontamentos').click()
    //cy.wait('@getApontamentos').its('response.body').should('property','total', 3)
    cy.get('po-info').should('contain', 'Qtde Refug: 2,0000')
    cy.get('po-info').should('contain', 'Qtde Prod: 20,0000')
    cy.get('po-info').should('contain', 'Qtde Refug: 3,0000')
    cy.get('po-info').should('contain', 'Qtde Prod: 30,0000')
    cy.get('po-info').should('contain', 'Qtde Refug: 4,0000')
    cy.get('po-info').should('contain', 'Qtde Prod: 40,0000')
    cy.get('app-production-order-reports.ng-star-inserted > .header-md > .toolbar-title-default > .buttons-first-slot > .md').click()
  })
})