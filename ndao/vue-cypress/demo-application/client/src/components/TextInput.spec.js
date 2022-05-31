/// <reference types="cypress" />

import { mount } from '@cypress/vue';
import { TextInput } from './index';

describe('Text Input', () => {
  it('should accept props', () => {
    mount(TextInput, {
      propsData: {
        label: "First Name",
        isRequired: true
      }
    });

    cy.get('label').should('have.text', 'First Name *');
  });
});