
import users from '../fixtures/users.json'
import LoginPage from '../support/pages/LoginPage'
import studentPage from '../support/pages/StudentPage'

describe('Login', () => {

    it('Cenário 01 - Deve logar com o perfil do Admin', () => {
        const user = users.admin

        LoginPage.doLogin(user)
        studentPage.navbar.userLoggedIn(user.name)


    })

    it('Cenário 02 - Não deve logar com senha incorreta', () => {
        const user = users.inv_pass

        LoginPage.doLogin(user)
        LoginPage.popup.haveText('Suas credenciais são inválidas, por favor tente novamente!')
    })

    it('Cenário 03 - Não deve logar com email não cadastrado', () => {
        const user = users.email_not_found

        LoginPage.doLogin(user)
        LoginPage.popup.haveText('Suas credenciais são inválidas, por favor tente novamente!')

    })

    it('Cenário 04 - Não deve logar com emails inválidos', () => {
        const emails = users.inv_emails

        let outputMessages = []
        let expectedMessages = []

        LoginPage.go()

        emails.forEach((u) => {
            LoginPage.fill(u)
            LoginPage.submit()
            
            LoginPage.popup.content()
                .invoke('text')
                .then((t)=>{
                    cy.log(t)
                    outputMessages.push(t)
                    expectedMessages.push('Insira um email válido.')
                })

            LoginPage.popup.back()
        })

        cy.wrap(outputMessages).should('deep.equal', expectedMessages)
    })


    it('Cenário 05 - Não deve logar com campo email em branco', () => {
        const user = users.empty_email

        LoginPage.doLogin(user)
        LoginPage.popup.haveText('Os campos email e senha são obrigatórios.')

    })

    it('Cenário 06 - Não deve logar com campo senha em branco', () => {
        const user = users.empty_password

        LoginPage.doLogin(user)
        LoginPage.popup.haveText('Os campos email e senha são obrigatórios.')

    })
})
