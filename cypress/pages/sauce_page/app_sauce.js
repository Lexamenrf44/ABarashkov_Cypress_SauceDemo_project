import data from "../../support/data";

const app_sauce = {

    loginUI(path = '', username = data.user_test_login, password = data.user_test_password, success = true) {

        // If username is empty, generate a new one
        if (!username || username.trim() === '') {
            username = generate.email();
        }

        // If password is empty, generate a new one
        if (!password || password.trim() === '') {
            password = generate.password();
        }

        cy.visit('' + path);
        cy.get(this.app_field_username_input).type(username);
        cy.get(this.app_field_password_input).type(password)
        cy.intercept('**/auth/validate').as('auth')
        cy.get(this.app_login_button).click()
        if (success) {
            cy.get(this.app_brand_logo).should('be.visible')
        } else {
            cy.get(this.app_brand_logo).should('not.exist')
        }
    },

    /*
    login(path = '', username = data.customer_001, password = data.defaultPassword, success = true) {
        helpers.prepareCookies()
        cy.request('GET', 'auth/sign_in').then((resp) => {
            expect(resp.status).to.eq(200)
            const token = (resp.body).match(/<meta name="csrf-token" content="(.*?)" \/>/)[1]
            cy.request({
                method: 'POST',
                url: 'auth/sign_in',
                form: true,
                followRedirect: false,
                body: {
                    'authenticity_token': token,
                    'user[email]': username,
                    'user[password]': password,
                },
            }).then((res) => {
                if (success) {
                    expect(res.status).to.eq(302)
                    const url = (res.redirectedToUrl).replace('/dashboard', '') + path
                    cy.log(`Visiting: ${url}`)
                    cy.visit(url)
                } else expect(res.status).to.eq(200)
            })
        })
    },

    assertSnackbar(msg) {
        cy.get('body').should('contain.text', msg)
    },
    */

    //Login page
    app_field_username_input: 'input[data-test="username"]',
    app_field_password_input: 'input[data-test="password"]',
    app_login_button: 'input[data-test="login-button"]',

    //App
    app_page_title: '.title',

    //Main page
    app_brand_logo: '.app_logo',
    app_inventory_item: '.inventory_item',
    app_inventory_btn: '.btn_inventory',
    app_shopping_cart: '.shopping_cart_link',
    app_shopping_cart_badge: '.shopping_cart_badge',

    //Cart page
    app_cart_list: '.cart_list',
    app_cart_item: '.cart_item',
    app_checkout_btn: '.checkout_button',

    //Checkout page
    app_firstName_field: '[name="firstName"]',
    app_lastName_field: '[name="lastName"]',
    app_postCode_field: '[name="postalCode"]',
    app_continue_btn: '[name="continue"]',

    //Overview page
    app_finish_btn: '[name="finish"]',

    //Finish page
    app_complete_header: '.complete-header',
}
export default {...app_sauce}