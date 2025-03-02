import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import loginForm from '~/components/forms/login-form.vue';

describe('login-form.vue', () => {

    it('mount without issue', () => {

        const wrapper = mount(loginForm);
        expect(wrapper.exists()).toBe(true);

    });

});