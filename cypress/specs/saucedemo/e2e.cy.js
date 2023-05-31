import data from "../../support/data";
import app_sauce from "../../pages/sauce_page/app_sauce";

describe('SauceDemo', () => {

  it('Should login to SauceDemo', () => {
    app_sauce.loginUI('', 'standard_user', 'secret_sauce')
    cy.url().should('include', '/inventory.html')

  })

  it('Should add item to shopping cart', () => {
    cy.get(app_sauce.app_inventory_item).first().find(app_sauce.app_inventory_btn).click()
    cy.get(app_sauce.app_shopping_cart_badge).should('be.visible')

  })

  it('Should check shopping cart', () => {
    cy.get(app_sauce.app_shopping_cart).click()
    cy.get(app_sauce.app_page_title)
        .should('be.visible')
        .and('contain.text', "Your Cart")
    cy.get(app_sauce.app_cart_list).should('contain.text', "Sauce Labs Backpack")
    cy.get(app_sauce.app_cart_item).should('be.visible')

  })

  it('Should checkout', () => {
    cy.get(app_sauce.app_checkout_btn).click()
    cy.get(app_sauce.app_page_title)
        .should('be.visible')
        .and('contain.text', "Your Information")
    cy.get(app_sauce.app_firstName_field).type('Alexander')
    cy.get(app_sauce.app_lastName_field).type('Barashkov')
    cy.get(app_sauce.app_postCode_field).type('0186')
    cy.get(app_sauce.app_continue_btn).click()

  })

  it('Should verify purchase', () => {
    cy.get(app_sauce.app_page_title)
        .should('be.visible')
        .and('contain.text', "Overview")
    cy.get(app_sauce.app_cart_list).should('contain.text', "Sauce Labs Backpack")
    cy.get(app_sauce.app_cart_item).should('be.visible')

  })

  it('Should finish purchase', () => {
    cy.get(app_sauce.app_finish_btn).click()
    cy.get(app_sauce.app_page_title)
        .should('be.visible')
        .and('contain.text', "Complete!")
    cy.get('.complete-header').should('contain.text', 'Thank you for your order!')

  })
})