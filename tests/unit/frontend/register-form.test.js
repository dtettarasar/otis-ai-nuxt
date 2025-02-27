import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import registerForm from '../../../components/forms/register-form.vue';

describe('register-form.vue', () => {

    it('mount without issue', () => {

      console.log('init test: mount without issue');

      const wrapper = mount(registerForm);

      expect(wrapper.exists()).toBe(true);

    });
    
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

          it('should not be valid if an incorrect email is provided in the user data', async () => {

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

      describe("Password validation", () => {

        it('should not be valid if the field is empty', async () => {

          const wrapper = mount(registerForm);

          await wrapper.vm.$nextTick();

          expect(wrapper.vm.passwordSecure).toBe(false);


        });

        it('should be valid if password is repeated correctly', async () => {

          
          const wrapper = mount(registerForm);
          wrapper.vm.user.pwd = "Test78!!"; 
          wrapper.vm.user.pwdRepeat = "Test78!!"; 
          
          expect(wrapper.vm.passwordsMatch).toBe(true);


        });

        it('should be not valid if password is not repeated correctly', async () => {

          const wrapper = mount(registerForm);
          wrapper.vm.user.pwd = "Test78!!"; 
          wrapper.vm.user.pwdRepeat = "notTheSamePwd";
          
          expect(wrapper.vm.passwordsMatch).toBe(false);

        });

        it('should be valid if a correct password is provided in the user data', async () => {

          const wrapper = mount(registerForm);
          wrapper.vm.user.pwd = "Test78!!"; 
          await wrapper.vm.$nextTick();

          expect(wrapper.vm.passwordSecure).toBe(true);

        });

      });

      describe("Test allParamsValid parameter", () => {

        it('should be false when no valid parameters are provided', async () => {

          const wrapper = mount(registerForm);
          await wrapper.vm.$nextTick();
          expect(wrapper.vm.allParamsValid).toBe(false);

        });

        it('should be true when valid parameters are provided', async () => {

          const wrapper = mount(registerForm);
          wrapper.vm.user.pwd = "Test78!!";
          wrapper.vm.user.pwdRepeat = "Test78!!";
          wrapper.vm.user.email = 'valid.usermail@test.com';
          wrapper.vm.user.name = 'ValidUser123';
          
          await wrapper.vm.$nextTick();

          expect(wrapper.vm.allParamsValid).toBe(true);

        });

      });

});