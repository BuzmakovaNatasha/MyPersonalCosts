import { shallowMount, mount } from "@vue/test-utils"
import PaginationComp from '../components/PaginationComp.vue'

describe('PaginationComp', () => {
    it('имеются ли кнопки пагинации, в зависимости от количества страниц', () => {
        const wrapper = mount(PaginationComp, {
            propsData: {
                pageCount: 2
            }
        })
        expect(wrapper.contains('button[name="1"]')).toBe(true)
        expect(wrapper.contains('button[name="2"]')).toBe(true)
        expect(wrapper.contains('button[name="3"]')).toBe(false)
    })

    it('имеется ли class="active" на открытой странице пагинации', () => {
        const wrapper = mount(PaginationComp, {
            propsData: {
                pageCount: 2,
                numberPageMain: 2
            }
        })
        const button = wrapper.find('button[name="2"]')
        expect(button.classes()).toContain('active')
    })

    it('изменяется ли pageNumber при клике по кнопке в пагинации', () => {
        const wrapper = shallowMount(PaginationComp, {
            propsData: {
                pageCount: 4
            }
        })
        const button = wrapper.find('button[name="4"]')
        button.trigger('click')
        expect(wrapper.vm.pageNumber).toBe(4)
    })

    it('работает ли правая стрелка в пагинации', () => {
        const wrapper = shallowMount(PaginationComp, {
            propsData: {
                pageCount: 4
            }
        })
        const buttonRight = wrapper.find('button[name="right"]')
        buttonRight.trigger('click')
        buttonRight.trigger('click')
        expect(wrapper.vm.pageNumber).toBe(3)
    })
})