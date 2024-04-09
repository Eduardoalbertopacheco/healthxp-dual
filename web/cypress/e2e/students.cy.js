
import students from '../fixtures/students.json'
import StudentPage from '../support/pages/StudentPage'

import studentPage from '../support/pages/StudentPage'

describe('alunos', () => {


    it('Deve poder cadastrar um novo aluno', () => {

        const student = students.create

        cy.task('deleteStudent', student.email)

        cy.adminLogin()

        studentPage.goToRegister()
        studentPage.submitForm(student)
        studentPage.popup.haveText('Dados cadastrados com sucesso.')

    })

    it('Não deve cadastrar com email duplicado', () => {

        const student = students.duplicate

        cy.task('deleteStudent', student.email)
        cy.task('insertStudent', student)

        cy.adminLogin()

        studentPage.goToRegister()
        studentPage.submitForm(student)
        studentPage.popup.haveText('O email informado já foi cadastrado!')

    })

    it('Deve poder remover um aluno sem matrícula', () => {

        const student = students.remove

        cy.task('deleteStudent', student.email)
        cy.task('insertStudent', student)

        cy.adminLogin()

        studentPage.search(student.name)
        studentPage.remove(student.email)
        studentPage.popup.confirm()
        studentPage.popup.haveText('Exclusão realizada com sucesso.')

    })

    it.only('Todos os campos são obrigatórios', () => {

        const student = students.required

        cy.adminLogin()
        studentPage.goToRegister()
        studentPage.submitForm(student)

        studentPage.requiredeMessage('Nome completo', 'Nome é obrigatório')
        studentPage.requiredeMessage('E-mail', 'O email é obrigatório')
        studentPage.requiredeMessage('Idade', 'A idade é obrigatória')
        studentPage.requiredeMessage('Peso (em kg)', 'O peso é obrigatório')
        studentPage.requiredeMessage('Altura', 'A altura é obrigatória')

    })

})
