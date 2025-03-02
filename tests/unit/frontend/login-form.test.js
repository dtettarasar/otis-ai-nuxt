import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import loginForm from '~/components/forms/login-form.vue';

describe('login-form.vue', () => {

    it('mount without issue', () => {

        const wrapper = mount(loginForm);
        expect(wrapper.exists()).toBe(true);

    });

    it('renders the username and password fields correctly', () => {

        const wrapper = mount(loginForm);
        expect(wrapper.find('input[name="username"]').exists()).toBe(true);
        expect(wrapper.find('input[name="pwd"]').exists()).toBe(true);

    });

    it('update the v-model values when typing in the according fields', async () => {

        const wrapper = mount(loginForm);
        
        const usernameInput = wrapper.find('input[name="username"]');
        await usernameInput.setValue('testUser');

        const passwordInput = wrapper.find('input[name="pwd"]');
        await passwordInput.setValue('testPwd123!!');

        expect(wrapper.vm.user.name).toBe('testUser');
        expect(wrapper.vm.user.pwd).toBe('testPwd123!!');

    });

    it('update password visibility correctly', async () => {

        const wrapper = mount(loginForm);

        const toggleBtn = wrapper.find('button');
        expect(toggleBtn.exists()).toBe(true);

        expect(wrapper.vm.showPassword).toBe(false);

        await toggleBtn.trigger('click');
        expect(wrapper.vm.showPassword).toBe(true);

        await toggleBtn.trigger('click');
        expect(wrapper.vm.showPassword).toBe(false);

    });
    
    it('shows error message when authentication fails (with promise rejection)', async () => {
        vi.stubGlobal('$fetch', vi.fn(() => Promise.reject(new Error('Auth failed'))));

        const wrapper = mount(loginForm);
        await wrapper.find('form').trigger('submit');

        await new Promise(resolve => setTimeout(resolve, 100)); // Attendre la mise à jour du DOM

        expect(wrapper.vm.showError).toBe(true);
        expect(wrapper.find('.alert-danger').exists()).toBe(true);
    });

    it('shows error message when authentication fails (with backend feedback)', async () => {
        
        vi.stubGlobal('$fetch', vi.fn(() =>
            Promise.resolve({ userAuthObj: { authSuccess: false } })
        ));

        const wrapper = mount(loginForm);
        await wrapper.find('form').trigger('submit');

        await new Promise(resolve => setTimeout(resolve, 100)); // Attendre la mise à jour du DOM

        expect(wrapper.vm.showError).toBe(true);
        expect(wrapper.find('.alert-danger').exists()).toBe(true);
    });

    it('shows success message when authentication succeeds', async () => {
        vi.stubGlobal('$fetch', vi.fn(() =>
            Promise.resolve({ userAuthObj: { authSuccess: true } })
        ));

        const wrapper = mount(loginForm);
        await wrapper.find('form').trigger('submit');

        await new Promise(resolve => setTimeout(resolve, 100));

        expect(wrapper.vm.showSuccess).toBe(true);
        expect(wrapper.find('.alert-success').exists()).toBe(true);
    });

});