import { mount } from '@vue/test-utils';
import { describe, it, expect, test } from 'vitest';
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

          it('should be valid if a correct email is provided in the user data', async () => {

            const wrapper = mount(registerForm);
            wrapper.vm.user.email = 'valid.usermail@test.com';
            await wrapper.vm.$nextTick();

            expect(wrapper.vm.emailValid).toBe(true);

          });

          it('should not be valid is an incorrect email is provided in the user data', async () => {

            const wrapper = mount(registerForm);
            
            const invalidEmails = [
                'incorrect.usermailtest.com',  // Pas de @
                ' incorrect.usermailtest.com', // Espace devant
                'incorrect!usermailtest.com',  // Caractère spécial invalide
                'user@domain',                 // Pas de domaine complet
                '@domain.com',                 // Pas de nom d'utilisateur
                'user@.com',                   // Pas de domaine valide
                'user@domain..com'             // Double point dans le domaine
            ];

            invalidEmails.forEach(async (email) => {
                wrapper.vm.user.email = email;
                await wrapper.vm.$nextTick();
                expect(wrapper.vm.emailValid).toBe(false);
            });

          });

      });

});


  