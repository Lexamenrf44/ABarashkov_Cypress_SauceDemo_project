// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// import './data';
// import './api/request';
// import 'cypress-real-events/support';
// import 'cypress-file-upload';
// import 'moment';
// import '@4tw/cypress-drag-drop'
// import { registerCypressGrep } from '@cypress/grep/src/support'
// registerCypressGrep()

//Clean state between test files (not happening automatically while testIsolation:false)
before(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
})

Cypress.on('test:after:run', (test, runnable) => {
    // Custom code after each test
})

Cypress.on(
    'uncaught:exception',
    (err) => !err.message.includes('ResizeObserver loop limit exceeded')
);