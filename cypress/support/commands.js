///<reference types="cypress" />

Cypress.Commands.add('tamanhoTelaParaMobile', () => {
    cy.viewport(360, 760)
  })
  
  Cypress.Commands.add('Config', () =>{
  
      cy.intercept('GET', 'http://localhost:8100/index.html').as('getConfig')
      cy.visit('http://localhost:8100/index.html', { force: true })
      cy.get('div').then((nome_qualquer) => {
        if (nome_qualquer.find('div', 'Carregando')) {
          cy.visit('http://localhost:8100/index.html',{ force: true })
        }
        else {
          cy.contains('div', 'Olá!').click({ force: true })
        }
      })
  
      cy.contains('div', 'Olá!').click({ force: true })
      cy.contains('ion-button', 'Começar a utilizar o Minha Produção').click()
      cy.contains('ion-button', 'Aceitar ').click()
      cy.contains('ion-button', 'Editar').click()
      cy.get('ion-radio').first().click()
      cy.get('ion-radio[ng-reflect-value=4]').click()
      cy.get('input[placeholder="Configurações"]').type('joisrvapldev001')
      cy.get('input[placeholder="Porta"]').type('8180')
      cy.contains('ion-button', 'Salvar').click()
      cy.wait('@getConfig').its('response.statusCode').should('eq', 200)
      
    })
    
    
    Cypress.Commands.add('Login', () => {
    
      const usuario = 'super' //variável
      const senha = 'Super@123'     //variável
      cy.intercept('GET', '**/dts/datasul-rest/resources/**').as('getLogar')
      cy.get('input[placeholder*="Seu usuário"]').type(usuario)
      cy.get('input[placeholder*="Sua senha"]').type((senha), { log: false })
      cy.contains('button', 'Entrar').click()
      cy.wait('@getLogar').its('response.statusCode').should('eq', 200)
    
    })
    
    
    Cypress.Commands.add('loginAptoHtml', () => {
    
      cy.visit('http://joisrvapldev001:8180/totvs-menu/#/', {force: true})
      cy.get('#txtUsername').type('super')
      cy.get('#txtPassword').type('Super@123')
      cy.contains('Entrar').click()
      cy.visit('http://joisrvapldev001:8180/totvs-menu/#/dts/mcp/productionappointment/', {force: true})
    
    })
  
    
    Cypress.Commands.add('mostraParadasDeMaquina', () => {
      //Esta customização pertence aos cenários: CN06_Consulta_OP_Operac_e_Paradas_SFC.cy
      cy.contains('ion-title', 'Máquina MBS').should('be.visible')
      cy.get('div').should('contain',' Paradas ')
      cy.intercept('GET', '**/joisrvapldev001:8180/api/sfc/v1/stops/**').as('paradas')
  
      cy.get('po-field-container[ng-reflect-label="Início"]').type('{selectall}01012018')
      cy.get('po-field-container[ng-reflect-label="Término"]').type('{selectall}10/07/2022')            
      cy.contains(' Paradas ').click()    
  
      cy.get('po-info').should('contain', 'Tempo: 1,00 h')
      cy.get('po-info').should('contain', 'Início: 13/03/2018 - 08:00').and('contain', 'Término: 13/03/2018 - 09:00')
      cy.get('po-info').should('contain', 'Motivo: 001 - Troca de Ferramenta')
      
      cy.get('po-info').should('contain', 'Tempo: 1,00 h')
      cy.get('po-info').should('contain', 'Início: 05/07/2022 - 06:30').and('contain', 'Término: 05/07/2022 - 07:30')
      cy.get('po-info').should('contain', 'Motivo: 001 - Troca de Ferramenta')
  
      cy.get('po-info').should('contain', 'Tempo: 1,00 h')
      cy.get('po-info').should('contain', 'Início: 05/07/2022 - 09:00').and('contain', 'Término: 05/07/2022 - 10:30')
      cy.get('po-info').should('contain', 'Motivo: 003 - Resfriamento da solda')
  
      cy.get('po-info').should('contain', 'Tempo: 1,25 h')
      cy.get('po-info').should('contain', 'Início: 05/07/2022 - 16:00').and('contain', 'Término: 05/07/2022 - 17:15')
      cy.get('po-info').should('contain', 'Motivo: 002 - Manutenção Preventiva')
   
      cy.get('ion-toast').click({force: true})        
        .invoke('attr', 'style', 'visibility:hidden')
      cy.wait('@paradas')
  
    })
  
    Cypress.Commands.add('clicaSetaVoltarParaInicioFormulario', () => {
      //Esta customização pertence aos cenários: CN06_Consulta_OP_Operac_e_Paradas_SFC.cy
      cy.get('app-production-order-stops.ng-star-inserted > .header-md > .toolbar-title-default > .buttons-first-slot > .md').click()
      cy.get('app-production-order-reports.ng-star-inserted > .header-md > .toolbar-title-default > .buttons-first-slot > .md').click()
      cy.contains(' Visualização Resumida ').click()
      cy.get('.ng-star-inserted.ion-page > .header-md > .toolbar-title-default > .buttons-first-slot > .md').click()
      cy.get('app-production-query-datasul.ion-page > .header-md > .toolbar-title-default > .buttons-first-slot > .md').click()
  
    })
  
    Cypress.Commands.add('incluirNovaReserva', () => {
      //Esta customização pertence ao cenário: CN06_Botoes_Aba_Reservas_Narrativa_PCP.cy
      cy.get('po-select[name="referenceCode"]').click()
      cy.contains('span','AZUL - AZUL').click()
      cy.get('input[name="operationCode"]').clear().type('10')
      cy.get('input[name="lotSeries"]').type('Lote Teste')
      cy.get('input[name="materialDate"]').type('{selectall}02092022')
    })
  
    Cypress.Commands.add('dataHora', () => {
      //Esta customização pertence ao cenário: CN07_Apont_OP_3_operac_1_externa.cy.js
      cy.get('input[name="dat_inic_setup"]').clear().type('09092022')
      cy.get('input[name="qtd_segs_inic_setup"]').clear().type('0430')
      cy.get('input[name="dat_fim_setup"]').clear().type('09092022')
      cy.get('input[name="qtd_segs_fim_setup"]').clear().type('0530')
      cy.get('input[name="dat_inic_reporte"]').clear().type('09092022')
      cy.get('input[name="qtd_segs_inic_reporte"]').clear().type('0530')
      cy.get('input[name="dat_fim_reporte"]').clear().type('09092022')
      cy.get('input[name="qtd_segs_fim_reporte"]').clear().type('0750')
    })