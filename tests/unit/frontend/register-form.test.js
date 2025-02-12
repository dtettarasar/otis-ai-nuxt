import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import registerForm from '~/components/forms/register-form.vue';

describe('register-form.vue', () => {

    describe('username validation', () => {

        it('should be not valid if the field is empty', async () => {
          const wrapper = mount(registerForm);
      
          // Met une valeur vide dans user.name
          await wrapper.vm.$nextTick(); // S'assurer que les valeurs réactives sont mises à jour
      
          expect(wrapper.vm.userNameValid).toBe(false);
        });
      
        it('should be valid if a correct username is provided in the user data', async () => {
          const wrapper = mount(registerForm);
      
          // Change la valeur du champ username
          wrapper.vm.user.name = 'ValidUser123';
          await wrapper.vm.$nextTick();
      
          expect(wrapper.vm.userNameValid).toBe(true);
        });
      
        it('should not be valid if an incorrect name is provided in the user data', async () => {
          const wrapper = mount(registerForm);
      
          wrapper.vm.user.name = 'Invalid@User!';
          await wrapper.vm.$nextTick();
      
          expect(wrapper.vm.userNameValid).toBe(false);
        });
    
      });

      describe('Email validation', () => {

        it('should be not valid if the field is empty', async () => {
            const wrapper = mount(registerForm);
        
            // Met une valeur vide dans user.name
            await wrapper.vm.$nextTick(); // S'assurer que les valeurs réactives sont mises à jour
        
            expect(wrapper.vm.emailValid).toBe(false);
          });

      });

});


  