describe('reset password using mailslurp', function () {

    it('Visit backmarket and send password reset email', function() {

        // Visit the website backmarket
        cy.visit('https://preprod.backmarket.fr/fr-fr/password-reset?email=564eee9e-46dc-40ab-ae33-0fd6dc50cf50%40mailslurp.com&origin=auth')
        cy.get('#email')
            .should('contain.value', '@mailslurp.com')
        cy.get('[data-test="password-reset-submit-button"]').click()
        cy.get('[data-qa="accept-cta"]').click()
        cy.get('.block')
            .should('include.text', 'Wouhou !')
        cy.get('.body-1-light')
            .should('include.text', '564eee9e-46dc-40ab-ae33-0fd6dc50cf50@mailslurp.com')

        // Receive email
        cy.mailslurp()
            .then(mailslurp => mailslurp.waitForLatestEmail('564eee9e-46dc-40ab-ae33-0fd6dc50cf50', 30000, true))
            .then(email => 
                //expect(email.subject).to.contain('Nouveau mot de passe'))
                cy.document().invoke('write', email.body))

        // Reset the password
        cy.get('.t_pt20px > a').click()
        cy.get('#newPassword').type('LegendOfZelda03')
            .should('contain.value', 'LegendOfZelda03')
        cy.get('#newPasswordConfirmation').type('LegendOfZelda03')
            .should('contain.value', 'LegendOfZelda03')
        cy.get('.MkLAMntR').click()

        //Connecion with the new password
        cy.get('#email').type('564eee9e-46dc-40ab-ae33-0fd6dc50cf50@mailslurp.com')
                .should('contain.value', '@mailslurp.com')
        cy.get('#submit-login').click()
        cy.get('#saved-email')
        cy.get('#password').type('LegendOfZelda03')
            .should('contain.value', 'LegendOfZelda03')
        cy.get('#submit-login').click()
    })
})