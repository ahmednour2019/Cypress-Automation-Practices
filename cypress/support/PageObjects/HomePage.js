class HomePage
{
getLogin()
{
    return cy.get('a.login')
}

getEmail()
{
    return cy.get('input#email')
}
getPassword()
{
    return cy.get('input#passwd')
}

getSignin()
{
    return cy.contains('Sign in')
}
getWomanTab()
{
    return cy.contains('Women')
}
getTopTab()
{
    return cy.contains('Tops')
}
getTshirt()
{
    return cy.contains('T-shirts')
}
getMore()
{
    return cy.contains('More')
}

}
export default HomePage;