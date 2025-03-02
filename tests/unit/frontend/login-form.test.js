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

});