import HomePage  from '../../support/PageObjects/HomePage'
/// <reference types="Cypress" />

describe('the first test suite for Automation Practice framework',function()
{
it('Check that the new order is added successfully in the orders list',function()
{

    const homePage= new HomePage()
    cy.visit(Cypress.env('url'))
    homePage.getLogin().click()
    homePage.getEmail().type('eng.ahmed.saleh.2013@gmail.com')
    homePage.getPassword().type('1425414')
    homePage.getSignin().click()
    homePage.getWomanTab().invoke('show')
    homePage.getTopTab().invoke('show')
    homePage.getTshirt().click({force: true})
    homePage.getMore().click()
    cy.get('.exclusive > span').click()
    cy.get('.button-medium > span').click()
    cy.get('.cart_navigation > .button > span').click()
    cy.get('#email').type('eng.ahmed.saleh.2013@gmail.com')
    cy.get('#passwd').type('1425414')
    cy.get('#SubmitLogin > span').click()
    cy.get('.cart_navigation > .button > span').click()
    cy.get('#cgv').check()
    cy.get('.cart_navigation > .button > span').click()
    cy.get('.bankwire').click()
    cy.get('#cart_navigation > .button > span').click()
    var y;
    cy.get('.box').then(function(element)
    {   
          const x= element.text()
          cy.log(x)
          y=x.match(/(\b[A-Z]{3}[A-Z]+|\b[A-Z]\b)/g)  
          cy.log(y)
    })
    cy.get('.button-exclusive').click()
    cy.get('tr td:nth-child(1)').each(($el, index, $list) => {
    const text1= $el.text()
    
     if(text1.includes(y))
     {
         cy.log('test passed successfully')
         expect(y).to.exist
     }
    
    })
})
})