import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import registerForm from '~/components/forms/register-form.vue';

describe('register-form.vue', () => {

    describe('Validation du username', () => {

        it('devrait être invalide si le champ est vide', async () => {
          const wrapper = mount(registerForm);
      
          // Met une valeur vide dans user.name
          await wrapper.vm.$nextTick(); // S'assurer que les valeurs réactives sont mises à jour
      
          expect(wrapper.vm.userNameValid).toBe(false);
        });
      
        it('devrait être valide pour un username correct', async () => {
          const wrapper = mount(registerForm);
      
          // Change la valeur du champ username
          wrapper.vm.user.name = 'ValidUser123';
          await wrapper.vm.$nextTick();
      
          expect(wrapper.vm.userNameValid).toBe(true);
        });
      
        it('devrait être invalide si le username contient des caractères spéciaux', async () => {
          const wrapper = mount(registerForm);
      
          wrapper.vm.user.name = 'Invalid@User!';
          await wrapper.vm.$nextTick();
      
          expect(wrapper.vm.userNameValid).toBe(false);
        });
    
      });

      describe('Validation du mail', () => {

        it('devrait être invalide si le champ est vide', async () => {
            const wrapper = mount(registerForm);
        
            // Met une valeur vide dans user.name
            await wrapper.vm.$nextTick(); // S'assurer que les valeurs réactives sont mises à jour
        
            expect(wrapper.vm.emailValid).toBe(false);
          });

      });

});


  