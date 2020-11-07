describe('Blog App', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      name      : 'Derek', 
      username  : 'fedellen',
      password  : 'password' 
    }

    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown by default', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('input:first').type('fedellen')
      cy.get('input:last').type('password')
      cy.contains('login').click()

      cy.contains('Derek is logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('input:first').type('fedellen')
      cy.get('input:last').type('wrongpassword')
      cy.contains('login').click()

      cy.contains('Wrong').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe.only('When user is logged in', function() {

    beforeEach(function() {
      cy.get('input:first').type('fedellen')
      cy.get('input:last').type('password')
      cy.contains('login').click()
    })

    it('A blog can be created', function() {

      cy.contains('Add New Blog').click()

      cy.get('#title').type('The Best Blog Ever')
      cy.get('#author').type('Best Writer Ever')
      cy.get('#url').type('www.best-blog-ever.com/best')

      cy.get('#createBlog').click()

      cy.contains('The Best Blog Ever')
      cy.contains('Best Writer Ever')
    })

    
  })
})