/// <reference types="Cypress" />





//const { invert } = require("cypress/types/lodash")

describe('Shipping 2 products',function()
{

    beforeEach(() => {
        cy.fixture('example').then(function(data){
        this.data= data
       })
     })
  it('Check the total amount of 2 displayed products',function()
{

    cy.visit('http://automationpractice.com/index.php?')
    cy.get('#search_query_top').type(this.data.productName2)
    cy.wait(3000)
    cy.get('div.ac_results').click()
    cy.contains('Add to cart').click()
    cy.contains('Continue shopping').click()

    cy.get('#search_query_top').type(this.data.productName3)
    cy.wait(3000)
    cy.get('div.ac_results').click()
    cy.contains('Add to cart').click()
    cy.contains('Proceed to checkout').click()
    cy.get('[title="View my shopping cart"]').find('span.ajax_cart_quantity').should('have.text','2')
    var sum=0
    cy.get('tr td:nth-child(6)').each(($el, index, $list) => {
   
        var val=$el.text().replace("$"," ").trim()
        sum = Number(sum) + parseInt(val)
     })

     var totalshipping=0
     cy.get('#total_shipping').then(function(element){
        var shipping= element.text().replace("$"," ").trim()
        totalshipping= Number(totalshipping)+parseInt(shipping)
     })

     cy.get('#total_price').then(function(element1){
         var x= element1.text().replace("$"," ")
         var total= parseInt(x)
         expect(total).to.be.equal(sum+totalshipping)
     })
}) 
it.only('Check the total amount after delete 1 of the displayed products',function()
{
    cy.visit('http://automationpractice.com/index.php?')
    cy.get('#search_query_top').type(this.data.productName2)
    cy.wait(3000)
    cy.get('div.ac_results').click()
    cy.contains('Add to cart').click()
    cy.contains('Continue shopping').click()

    cy.get('#search_query_top').type(this.data.productName3)
    cy.wait(3000)
    cy.get('div.ac_results').click()
    cy.contains('Add to cart').click()
    cy.contains('Proceed to checkout').click()
    cy.get('[title="View my shopping cart"]').find('span.ajax_cart_quantity').should('have.text','2')
   // cy.pause()
    cy.get('tr td:nth-child(2)').each(($el, index, $list) => {
        var x= $el.text()
        cy.log(x)
         if(x.includes("Blouse"))
         {
            cy.get('tr td:nth-child(2)').eq(index).next().next().next().next().next().find('a.cart_quantity_delete').click()
            cy.wait(3000)
            
         }
     })
     var sum=0
     cy.get('tr td:nth-child(6)').then(function(element)
     {
        var x= element.text().replace("$"," ").trim()
        sum = Number(sum) + parseInt(x)
     })

     
      var totalshipping=0
      cy.get('#total_shipping').then(function(element1){
         var shipping= element1.text().replace("$"," ").trim()
         totalshipping= Number(totalshipping)+parseInt(shipping)
      })

      cy.get('#total_price').then(function(element2){
        var y= element2.text().replace("$"," ").trim()
        var total= parseInt(y)
        cy.wait(3000)
        expect(total).to.be.equal(sum+totalshipping)
    })
    cy.get('[title="View my shopping cart"] > .ajax_cart_quantity').should('have.text','1')
})

it('Check the total amount of 2 displayed products through my shopping Cart ',function()
{

    cy.visit('http://automationpractice.com/index.php?')
    cy.get('#search_query_top').type(this.data.productName4)
    cy.wait(3000)
    cy.contains('Printed Chiffon Dress').click()
    cy.contains('Add to cart').click()
    cy.contains('Continue shopping').click()

    cy.get('#search_query_top').type(this.data.productName4)
    cy.wait(3000)
    cy.contains('Printed Dress').click({force: true})
   // cy.get('.ac_results > ul > :nth-child(3)').click()

    cy.contains('Add to cart').click()
    cy.contains('Continue shopping').click()
    cy.get('[title="View my shopping cart"] > .ajax_cart_quantity').should('have.text',2)

    cy.get('div.shopping_cart').invoke('show')
    var sum =0
    cy.get('div.cart_block_list').find('span.price').each(($el, index, $list) => {
    if(index<3)
    {
      var text=$el.text().trim().substring(1)
      sum= Number(sum)+parseFloat(text)
      cy.log(sum)
    }
    })
    
    var total=0
    cy.get('div.cart-prices-line.last-line').find('span.price.cart_block_total.ajax_block_cart_total').then(function(element4)
    {
       var text4=element4.text().trim().substring(1)
       var total= parseFloat(text4)
       cy.log(total)
       expect(total).to.be.equal(sum) 
    })
    cy.get('#button_order_cart').click({force: true})
})


/* here we set the css property of this specific block "cart" to be display: inline instead of display: none , so we can procees working on it properly */
it('Check the total amount of 2 displayed products through my shopping Cart after deleting 1 of the displayed products ',function()
{

    cy.visit('http://automationpractice.com/index.php?')
    cy.get('#search_query_top').type(this.data.productName4)
    cy.wait(3000)
    cy.contains('Printed Chiffon Dress').click()
    cy.contains('Add to cart').click()
    cy.contains('Continue shopping').click()
    cy.get('#search_query_top').type(this.data.productName2)
    cy.wait(3000)
    cy.get('div.ac_results').click()
    cy.contains('Add to cart').click()
    cy.contains('Continue shopping').click()
    cy.get('[title="View my shopping cart"] > .ajax_cart_quantity').should('have.text',2)
    // to apply mousehover we should use jquery method 'invoke('show')'
    cy.get('[title="View my shopping cart"]').invoke('show').click()
    //to change CSS attribute we should use jquery method 'invoke('attr','style','.....')'
    cy.get('div.cart_block.block.exclusive')
        .invoke('attr', 'style', 'display: inline;')
        .should('have.attr', 'style', 'display: inline;')
        cy.get('dl.products').find('a.cart_block_product_name').each(($el, index, $list) => {
         if($el.text().includes(this.data.productName2))
         {
             cy.get('a.ajax_cart_block_remove_link').eq(index).click()
         }
        })       
    var sum=0
    var x=0
    var y=0
    var total=0
    cy.wait(5000)
    cy.get('div.cart_block_list').find('div.cart-info span.price').then(function(element5){
         x=element5.text().trim().substring(1)
         x=parseFloat(x)
    })
    //cy.wait(5000)
    cy.get('span.price.cart_block_shipping_cost.ajax_cart_shipping_cost').then(function(element6){
         y= element6.text().trim().substring(1)
         y=parseFloat(y)
    })
    cy.get('span.price.cart_block_total.ajax_block_cart_total').then(function(element7) {
        sum= element7.text().trim().substring(1)
        sum = parseFloat(sum)
        total= x+y
        total= parseFloat(total)
        expect(total).to.be.equal(sum)
    })
    cy.contains('Check out').click()
    cy.contains('Proceed to checkout').then(function(element8){
        expect(element8).to.be.exist
    })
    
    })

})
