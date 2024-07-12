
describe('phonebook app', function () {
    it('full page with headers is visible', function () {
        cy.visit('http://localhost:3001')
        cy.contains('Phonebook')
        cy.contains('Numbers')
    })

    it('a user can add in a number', function () {
      cy.visit('http://localhost:3001')
      cy.get('#name').type('testname')
      cy.get('#number').type('08-123456')
      cy.get('#add_button').click()

      cy.contains('name 08-123456')
    })

    it('a user can delete their recent entry', function () {
      cy.visit('http://localhost:3001')
      cy.get('#testname').click()
      cy.on('window:confirm', function () {return true})
      cy.get('testname').should('not.exist')
    })
})

