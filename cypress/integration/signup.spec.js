
import signup from '../support/pages/signup'


describe('Cadastro', () => {

    context('Quando o usuário é novato', function () {
        const user = {
            name: 'teste',
            email: 'sheikeira@barbershop.com',
            password: 'pwd1234'
        }

        before(function () {
            cy.task('removeUser', user.email).then(
                function (result) {
                    console.log(result)
                }
            )
        });

        it('Deve cadastrar um novo usuário', () => {

            signup.go()
            signup.form(user)
            signup.submit()
            signup.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
        });
    });


    context('Quando o usuário já existe', function () {
        const user = {
            name: 'teste',
            email: 'sheikeira@imbev.com',
            password: 'pwd1234',
            is_provider: true
        }

        before(function () {
            cy.task('removeUser', user.email).then(
                function (result) {
                    console.log(result)
                }
            )

            cy.request(

                'POST',
                'http://localhost:3333/users',
                user
            ).then(function (response) {
                expect(response.status).to.eq(200)
            })
        });

        it('Deve exibir e-mail já cadastrado', () => {

            signup.go()
            signup.form(user)
            signup.submit()
            signup.toast.shouldHaveText('Email já cadastrado para outro usuário.')

        });
    });

    context('quando a senha é muito curta', () => {

        const passwords = ['1', '2a', 'ab3', 'abc4', 'ab#c5']



        beforeEach(() => {
            signup.go()
        });

        passwords.forEach(function (p) {
            it('não deve cadastrar ' + p, () => {

                const user = {
                    name: 'Addin',
                    email: 'ad@di.com',
                    password: p
                }

                signup.form(user)
                signup.submit()

            });
        })

        afterEach(() => {
            signup.alertHaveText('Pelo menos 6 caracteres')
        });

    });

    context('quando não preencho nenhum dos campos', () => {
        const alertMessages = [
            'Nome é obrigatório',
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        before(() => {
            signup.go()
            signup.submit()
        });

        alertMessages.forEach(function (alerts) {

            it('validação do alerta ' + alerts.toLowerCase(), () => {

                signup.alertHaveText(alerts)

            });
        })
    });
});