import { getGreeting } from '../support/app.po';

// describe('toon-galaxy-e2e', () => {
//   beforeEach(() => cy.visit('/'));

//   it('should display welcome message', () => {
//     // Custom command example, see `../support/commands.ts` file
//     cy.login('my-email@something.com', 'myPassword');

//     // Function helper example, see `../support/app.po.ts` file
//     getGreeting().contains(/Welcome/);
//   });
// });

describe('Toon Galaxy App', () => {
  beforeEach(() => cy.visit('/'));

  describe('Navigation', () => {
    it('should initially display the home page', () => {
      cy.url().should('include', '/manage-characters/search');
      cy.contains('h1', 'Início');
    });

    it('should display the toggle button', () => {
      cy.get('design-system-toggle-button').should('be.visible');
    });

    it('click on Favorites button in toggle should navigate to favorites page', () => {
      // Seleciona o botão Favoritos dentro do componente toggle-button
      cy.get('design-system-toggle-button button')
        .contains('Favoritos')
        .click();

      // Verifica se a navegação ocorreu corretamente
      cy.url().should('include', '/favorites');
      cy.contains('h1', 'Favoritos');
    });

    it('click on Home button in toggle should navigate to search page', () => {
      // Seleciona o botão Home dentro do componente toggle-button
      cy.get('design-system-toggle-button button').contains('Início').click();

      // Verifica se a navegação ocorreu corretamente
      cy.url().should('include', '/manage-characters/search');
      cy.contains('h1', 'Início');
    });
  });

  describe('Character Search', () => {
    it('should search and display characters', () => {
      // Interage com o campo de busca
      cy.get('[data-testid=search-input]').type('Rick Sanchez');

      // Aguarda o debounce de 300 ms
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(300);

      // Verifica a quantidade de cards exibidos
      cy.get('[data-testid=card]').should('have.length', 4);

      // Verifica o conteúdo de cada card
      cy.get('[data-testid=card]').each(($el, index, $list) => {
        cy.wrap($el)
          .find('[data-testid=card-name]')
          .should('contain', 'Rick Sanchez');
        cy.wrap($el).find('[data-testid=card-species]').should('not.be.empty');
        cy.wrap($el)
          .find('[data-testid=card-image]')
          .should('have.attr', 'src')
          .should('not.be.empty');
      });
    });

    // TODO: - Update search immediately after 'enter'
    // it('should search and display characters when Enter key is pressed', () => {
    //   // Interage com o campo de busca e pressiona Enter
    //   cy.get('[data-testid=search-input]').type('Beth Smith{enter}');

    //   // Verifica se os resultados da busca aparecem
    //   // cy.get('[data-testid=card-name]').should('contain', 'Beth Smith');

    //   // Verifica o conteúdo de cada card
    //   cy.get('[data-testid=card]').each(($el, index, $list) => {
    //     cy.wrap($el)
    //       .find('[data-testid=card-name]')
    //       .should('contain', 'Beth Smith');
    //     cy.wrap($el).find('[data-testid=card-species]').should('not.be.empty');
    //     cy.wrap($el)
    //       .find('[data-testid=card-image]')
    //       .should('have.attr', 'src')
    //       .should('not.be.empty');
    //   });
    // });
  });

  describe('Favorite Characters', () => {
    it('should allow users to favorite and unfavorite a character', () => {
      // Interage com o campo de busca
      cy.get('[data-testid=search-input]').type('Morty');

      // Aguarda o debounce de 300 ms
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(300);

      // Favorita um personagem
      cy.get('[data-testid=card]')
        .first()
        .within(() => {
          // Verifica o estado inicial do ícone de favorito
          cy.get('[data-testid=card-favorite-button]')
            .find('fa-icon')
            .then(($icon) => {
              const initialState = $icon.hasClass('selected');

              // Clica no botão de favorito
              cy.get('[data-testid=card-favorite-button]').click();

              // Verifica se o estado do ícone mudou
              cy.get('[data-testid=card-favorite-button]')
                .find('fa-icon')
                .should(($iconAfter) => {
                  expect($iconAfter.hasClass('selected')).not.to.equal(
                    initialState,
                  );
                });

              // Clica novamente para desfavoritar
              cy.get('[data-testid=card-favorite-button]').click();

              // Verifica se o estado do ícone voltou ao inicial
              cy.get('[data-testid=card-favorite-button]')
                .find('fa-icon')
                .should(($iconAfter) => {
                  expect($iconAfter.hasClass('selected')).to.equal(
                    initialState,
                  );
                });
            });
        });
    });
  });

  describe('Favorite Characters List', () => {
    it('should display the list of favorite characters', () => {
      // Seleciona o botão Favoritos dentro do componente toggle-button
      cy.get('design-system-toggle-button button')
        .contains('Favoritos')
        .click();

      // Verifica se a lista de favoritos inicialmente é vazia
      // cy.get('[data-testid=card]').should('not.be.visible');
    });

    it('should ', () => {
      // Adicionar 3 favoritos
      // Navegar favoritos
      // Verifica se os personagens favoritos estão na lista
      // cy.get('[data-testid=card-name]').should('contain', 'Morty');
    });
  });
});
