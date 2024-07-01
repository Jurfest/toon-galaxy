// import { getGreeting } from '../support/app.po';

// describe('Toon Galaxy E2E', () => {
//   beforeEach(() => cy.visit('/'));

//   it('should display welcome message', () => {
//     // Custom command example, see `../support/commands.ts` file
//     cy.login('my-email@something.com', 'myPassword');

//     // Function helper example, see `../support/app.po.ts` file
//     getGreeting().contains(/Welcome/);
//   });
// });

describe('Toon Galaxy App', () => {
  describe('Navigation', () => {
    beforeEach(() => cy.visit('/'));

    it('should initially display the home page', () => {
      cy.url().should('include', '/manage-characters/search');
      cy.contains('h1', 'Início');
    });

    it('should display the toggle button', () => {
      cy.get('design-system-toggle-button').should('be.visible');
    });

    it('should navigate to the favorites page when clicking the Favorites button', () => {
      cy.get('design-system-toggle-button button')
        .contains('Favoritos')
        .click();
      cy.url().should('include', '/favorites');
      cy.contains('h1', 'Favoritos');
    });

    it('should navigate to the search page when clicking the Home button', () => {
      cy.visit('/manage-characters/favorites');

      cy.get('design-system-toggle-button button').contains('Início').click();
      cy.url().should('include', '/manage-characters/search');
      cy.contains('h1', 'Início');
    });

    it('should navigate to the search page when clicking the "Voltar ao início" button', () => {
      cy.visit('/manage-characters/favorites');

      cy.get('design-system-empty-result button').should('be.visible');
      cy.get('design-system-empty-result button')
        .contains('Voltar ao início')
        .click();

      cy.url().should('include', '/manage-characters/search');
    });
  });

  describe('Character Search', () => {
    beforeEach(() => cy.visit('/'));

    it('should search and display characters', () => {
      cy.get('[data-testid=search-input]').type('Rick Sanchez');

      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(300); // Wait for debounce

      cy.get('[data-testid=card]').should('have.length', 4);

      cy.get('[data-testid=card]').each(($el) => {
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

    it('should display empty result component when no characters are found', () => {
      cy.get('[data-testid=search-input]').type('NonExistentCharacter');
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(300); // Wait for debounce

      cy.get('design-system-empty-result').should('be.visible');
      cy.get('design-system-empty-result').within(() => {
        cy.contains('h2', 'Nada foi encontrado');
        cy.contains('p', 'Tente realizar uma nova busca.');
      });
    });
  });

  describe('Favorite Characters', () => {
    beforeEach(() => cy.visit('/'));

    it('should allow users to favorite and unfavorite a character', () => {
      cy.get('[data-testid=search-input]').type('Morty');
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(300); // Wait for debounce

      cy.get('[data-testid=card]')
        .first()
        .within(() => {
          cy.get('[data-testid=card-favorite-button]')
            .find('fa-icon')
            .then(($icon) => {
              const initialState = $icon.hasClass('selected');

              cy.get('[data-testid=card-favorite-button]').click();

              cy.get('[data-testid=card-favorite-button]')
                .find('fa-icon')
                .should(($iconAfter) => {
                  expect($iconAfter.hasClass('selected')).not.to.equal(
                    initialState,
                  );
                });

              cy.get('[data-testid=card-favorite-button]').click();

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

    it('should display empty result component when no favorite characters exists yet', () => {
      cy.get('design-system-toggle-button button')
        .contains('Favoritos')
        .click();

      cy.get('[data-testid=card-container]').should('not.exist');

      cy.get('design-system-empty-result').should('be.visible');
      cy.get('design-system-empty-result').within(() => {
        cy.contains('h2', 'Parece que você ainda não tem favoritos');
        cy.contains(
          'p',
          'Volte à página inicial e escolha os melhores para você.',
        );
        cy.contains('design-system-button ', 'Voltar ao início');
      });
    });
  });

  describe('Favorite Characters List', () => {
    it('should not display any initially favorite characters', () => {
      cy.visit('/');

      cy.get('design-system-toggle-button button')
        .contains('Favoritos')
        .click();

      cy.get('[data-testid=card-container]').should('not.exist');
    });

    it('should add 3 characters to favorites and display them in the favorites list', () => {
      cy.visit('/');

      const addToFavorites = (character: string) => {
        cy.get('[data-testid=search-input]').type(`${character}{enter}`);
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(300); // Wait for debounce

        cy.get('[data-testid=card]')
          .first()
          .within(() => {
            cy.get('[data-testid=card-favorite-button]').click();
          });

        cy.get('[data-testid=search-input]').find('input').clear();
      };

      // Add characters to favorites
      addToFavorites('Morty');
      addToFavorites('Rick');
      addToFavorites('Snuffles');

      cy.get('design-system-toggle-button button')
        .contains('Favoritos')
        .click();

      cy.get('[data-testid=card]').should('have.length', 3);

      cy.get('[data-testid=card]').each(() => {
        cy.get('[data-testid=card-name]').should('contain', 'Morty');
        cy.get('[data-testid=card-name]').should('contain', 'Rick');
        cy.get('[data-testid=card-name]').should('contain', 'Snuffles');
      });
    });

    it('should remove character from favorite list', () => {
      cy.visit('/');

      cy.get('[data-testid=search-input]').type('Morty');
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(300); // Wait for debounce

      cy.get('[data-testid=card]')
        .first()
        .within(() => {
          cy.get('[data-testid=card-favorite-button]').click();
        });

      // Navigate to the favorites list
      cy.get('design-system-toggle-button button')
        .contains('Favoritos')
        .click();

      cy.get('[data-testid=card]').should('have.length', 1);

      // Remove Morty from favorites
      cy.get('[data-testid=card]')
        .first()
        .within(() => {
          cy.get('[data-testid=card-favorite-button]').click();
        });

      // Assert that there are no favorites
      cy.get('[data-testid=card]').should('not.exist');
    });

    it('should correctly update totalFavoriteCharacters when a card is selected or unselected as favorite', () => {
      cy.visit('/');

      cy.get('[data-testid=search-input]').type('Smith');
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(300);

      cy.get('[data-testid=card]')
        .first()
        .within(() => {
          cy.get('[data-testid=card-favorite-button]').click();
        });

      // Assert that the totalFavoriteCharacters updates from 0 to 1
      cy.get('[data-testid=toggle-button-total-favorites]').should(
        'contain',
        '1',
      );

      // Deselect the favorite to revert the count to 0
      cy.get('[data-testid=card]')
        .first()
        .within(() => {
          cy.get('[data-testid=card-favorite-button]').click();
        });

      // Assert that the totalFavoriteCharacters updates back to 0
      cy.get('[data-testid=toggle-button-total-favorites]').should(
        'contain',
        '0',
      );
    });
    //
  });
});
