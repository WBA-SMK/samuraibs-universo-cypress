
import { el } from './elements';


class Toast{
   
    shouldHaveText(toastHaveText) {

        cy.get(el.toast)
            .should('be.visible')
            .find('p')
            .should('have.text', toastHaveText)

    }

}

export default new Toast()