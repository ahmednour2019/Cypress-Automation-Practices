
import HomePage  from '../../support/PageObjects/HomePage'
/// <reference types="Cypress" />


    describe('the first test suite for my wishlists test cases',function()
    {

    beforeEach(() => {
        cy.fixture('example').then(function(data){
        this.data= data
       })
     })
     //this test is to validate that u can added a wishlist and add a product to it and validate that this product is exist inside the created whishlist
it('Check that you can add a product to wishlist successfully',function()
{

    const homePage= new HomePage()
    cy.visit(Cypress.env('url'))
    homePage.getLogin().click()
    homePage.getEmail().type('eng.ahmed.saleh.2015@gmail.com')
    homePage.getPassword().type('123456')
    cy.get('#SubmitLogin > span').click()
    cy.contains('My wishlists').click()
    cy.get('input#name').type(this.data.wishList) 
    cy.get('button#submitWishlist').click()
    cy.get('table.table.table-bordered').find('tr td:nth-child(1)').each(($el, index, $list) => {
    var textValue= $el.text().trim()
    if(textValue.includes(this.data.wishList))
    {
      cy.log(textValue)
      expect(textValue).to.contains(this.data.wishList)
    }
    })
    cy.contains('Back to Your Account').click()
    cy.get('#search_query_top').type(this.data.productName3)
    cy.wait(3000)
    cy.get('div.ac_results').click()
    cy.get('a#wishlist_button').click()
    cy.get('p.fancybox-error').should('have.text','Added to your wishlist.')
    cy.get('a.fancybox-item.fancybox-close').click()
    cy.get('a.account').click()
    cy.contains('My wishlists').click()
    cy.contains(this.data.wishList).click()
    cy.get('p#s_title').then(function(element)
    {
       var x= element.text().trim()
       if(x.includes('Faded Short Sleeve T-shirts'))
       {
        expect(x).to.exist
       }
       
    }) 
    /* cy.get('table.table.table-bordered').find('tr:nth-child(1) td:nth-child(5)').click()
    cy.get('p.product-name').then(function(textValue2){
     const y=textValue2.text().trim()
     expect(y).to.contains('Faded Short Sleeve T-shirts')
    }) */
})


//this test for make sure that the new whishlist that u just created will be deleted from the DOM Element using assertion should('not.exist')
it('Check that you can delete wishlist successfully',function()
{
  const homePage= new HomePage()
    cy.visit(Cypress.env('url'))
    homePage.getLogin().click()
    homePage.getEmail().type('eng.ahmed.saleh.2015@gmail.com')
    homePage.getPassword().type('123456')
    cy.get('#SubmitLogin > span').click()
    cy.contains('My wishlists').click()
    cy.get('input#name').type(this.data.wishList) 
    cy.get('button#submitWishlist').click()
    cy.get('table.table.table-bordered').find('tr td:nth-child(1)').each(($el, index, $list) => {
      var y= $el.text().trim()
      cy.log(y)
      if(y.includes("hi all this is my wishlist"))
      {
        cy.get('tr td:nth-child(1)').eq(index).next().next().next().next().next().find('.icon-remove').click()
        cy.wait(3000)
        // this assertion is used to validate whether the DOM element is exist or not and not for visiblity because visibility depend on css property like display 'none' and if u verify visiblity we use cy.should(not.to.visible)
        cy.contains(this.data.wishList).should('not.exist')
  
     }
    }) 


})

})