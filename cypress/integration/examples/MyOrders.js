import HomePage  from '../../support/PageObjects/HomePage'
/// <reference types="Cypress" />

 describe('the first test suite for my Orders test cases',function()
    {

    beforeEach(() => {
        cy.fixture('example').then(function(data){
        this.data= data
       })
      })
      //we validate that we can add a message to a specific order successfully
it('Check that you can add a comment sucessfully for a specific existing order',function()
{

    const homePage= new HomePage()
    cy.visit(Cypress.env('url'))
    homePage.getLogin().click()
    homePage.getEmail().type('eng.ahmed.saleh.2015@gmail.com')
    homePage.getPassword().type('123456')
    cy.get('#SubmitLogin > span').click()
    cy.contains('Order history and details').click()
    cy.get('tr td:nth-child(1)').each(($el, index, $list) => {
        var x=$el.text()
      if(x.includes(this.data.existingOrder))
      {
        cy.get('tr td:nth-child(1)').eq(index).click()
      }
    })  
    cy.get('.footable-row-detail-value > .btn > span').click()
    cy.get('select').select('Faded Short Sleeve T-shirts - Color : Orange, Size : S')
    cy.get('textarea.form-control').type('hi this order is not sufficient to me')
    cy.contains('Send').click({force: true})
    cy.get('table.detail_step_by_step.table.table-bordered tr.first_item.item>td:nth-child(2)').each(($el, index, $list) => {
    {
        const y= $el.eq(index).text().trim()
        if(y.includes(this.data.commentMSG))
        {
          cy.log(y)
          expect(y).to.contains(this.data.commentMSG)
        }
    }
    
  
    cy.get('.alert').then(function(value2)
    {
        const z= value2.text()
        expect(z).to.contains('Message successfully sent')
    }) 

})
})
})
