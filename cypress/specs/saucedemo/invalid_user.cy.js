import data from "../../support/data";
import app_sauce from "../../pages/sauce_page/app_sauce";

describe('SauceDemo', () => {

    it('Should not login to SauceDemo with invalid credentials', () => {
        app_sauce.loginUI('', 'invalid_user', 'invalid_password', false)
        cy.url().should('not.include', '/inventory.html')

    })
})