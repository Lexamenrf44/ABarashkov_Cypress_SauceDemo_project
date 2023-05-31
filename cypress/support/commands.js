global.helpers = {

    clickIfVisible: (element, force = false, untilNotExist = false) => {
        cy.get('body').then((body) => {
            if (body.find(element).length > 0) {
                if (!untilNotExist) {
                    cy.get(element).click({force: force})
                } else {
                    cy.get(element).click({force: force}).should('not.exist')
                }

            }
        })
    },

    clickOnElementWithinText: (parent, text, target, isForce = false) => {
        cy.get(parent).contains(text).should('exist')
        if (target) {
            cy.get(target).should('exist')
            cy.get(parent).contains(parent, text).find(target).should('exist').click({force: isForce})
        } else {
            cy.get(parent).contains(parent, text).click({force: isForce})
        }
    },

    clickWithIntercept: (click, path, method, status, isForce = false) => {
        if (!method) cy.intercept(path).as('req')
        else cy.intercept(method, path).as('req')
        cy.get(click).should('exist').click({force: isForce})
        cy.wait(`@req`).then((res) => {
            if (status) cy.wrap(res).its('response.statusCode').should('eq', status)
        })
    },

    clickOnElementByText: (item, containsText, isForce = false) => {
        cy.get(item, {timeout: 10000}).contains(containsText).click({force: isForce})
    },

    globalEsc: () => {
        cy.get('body').type('{esc}')
    },

    clickStubReload: (clickOn) => {
        cy.window().document().then(function (doc) {
            doc.addEventListener('click', () => {
                setTimeout(function () {
                    doc.location.reload()
                }, 3000)
            })
            cy.get(clickOn).first().click()
        })
    },

    hoverAndClickOnElementWithinText(elementToHover, text, target) {
        cy.get(elementToHover).contains(text).should('exist').realHover()
        if (target) {
            cy.get(target).should('exist')
            cy.get(elementToHover).contains(elementToHover, text).find(target).should('exist').click({force: true})
        } else {
            cy.get(elementToHover).contains(elementToHover, text).click()
        }
    },

    assertElements([array], assertion) {
        cy.wrap([array]).each((item) => {
            cy.get(item).should(assertion)
        })
    },

    compareLists(comparedList, listToCompare, size) {
        cy.get(comparedList).should('have.length', size)
        cy.get(comparedList).each((item, index, list) => {
            expect(list.eq(index)).to.contain(listToCompare[index])
        })
    },

    skipException() {
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
        })
    }

}

Cypress.Commands.add('checkUrl', (url) => {
    cy.url().should('include', url)
})

Cypress.Commands.add('any', {prevSubject: 'element'}, (subject, size = 1) => {
    cy.wrap(subject).then(elementList => {
        elementList = (elementList.jquery) ? elementList.get() : elementList;
        elementList = Cypress._.sampleSize(elementList, size);
        elementList = (elementList.length > 1) ? elementList : elementList[0];
        cy.wrap(elementList);
    })
})

Cypress.Commands.add('dragAndDrop', (subject, target) => {
    cy.log(`Dragging ${subject} to ${target}`)
    cy.get(subject)
        .trigger("mousedown", {button: 0});
    cy.wait(500)
    cy.get(target).trigger("mousemove")
    cy.get(target).trigger("mousemove", 'top')
    cy.get(target).click();
});

Cypress.Commands.add('dragAndDropByText', (parent, text, target) => {
    cy.log(`Dragging ${text} within ${parent} to ${target}`)
    cy.get(parent).contains(text)
        .trigger("dragstart");
    cy.wait(500)
    cy.get(target).trigger("dragover")
    cy.get(target).trigger("drop")
});

Cypress.Commands.add('getIframe', (iframe) => {
    return cy.get(iframe)
        .its('0.contentDocument.body')
        .should('be.visible')
        .then(cy.wrap);
});