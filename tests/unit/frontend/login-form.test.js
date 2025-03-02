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

});