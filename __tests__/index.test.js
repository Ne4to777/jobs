import { mount } from '@vue/test-utils'
import Component from '../src/views/NotFound.vue'

describe('Component', () => {
	test('является экземпляром Vue', () => {
		const wrapper = mount(Component)
		expect(wrapper.isVueInstance()).toBeTruthy()
	})
})
