import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import Navbar from './Navbar.vue'

const setWindowSize = (width: number, height: number): void => {
  window.innerWidth = width
  window.innerHeight = height
  window.dispatchEvent(new Event('resize'))
}

describe('Navbar Component', () => {
  test('renders correctly when products dropdown is closed', async () => {
    const wrapper = mount(Navbar)

    // Check if the mobile menu button exists
    const mobileMenuButton = wrapper.find('[aria-label="Open main menu"]')
    expect(mobileMenuButton.exists()).toBe(true)

    // Check if the logo is rendered
    const logo = wrapper.find('img[alt="Your Company"]')
    expect(logo.exists()).toBe(true)

    // Check if regular navigation links are visible
    const promotionsLink = wrapper.find('a[href="#promotions"]')
    expect(promotionsLink.exists()).toBe(true)

    // Check if blog link is visible
    const blogLink = wrapper.find('a[href="#blog"]')
    expect(blogLink.exists()).toBe(true)

    // Check if Products dropdown button is visible
    const productsDropdownButton = wrapper.find('button[aria-label="Products"]')
    expect(productsDropdownButton.exists()).toBe(true)

    // Check if the Cart button is visible
    const cartButton = wrapper.find('button[aria-label="View cart"]')
    expect(cartButton.exists()).toBe(true)

    // Check if the Login button is visible
    const loginButton = wrapper.find('button[aria-label="Login"]')
    expect(loginButton.exists()).toBe(true)
  })

  test('opens products dropdown when clicked', async () => {
    const wrapper = mount(Navbar)

    // Click on the products dropdown button
    await wrapper.find('button[aria-label="Products"]').trigger('click')

    // Check if dropdown items are visible
    const shoesLink = wrapper.find('a[href="#shoes"]')
    expect(shoesLink.exists()).toBe(true)

    const bagsLink = wrapper.find('a[href="#bags"]')
    expect(bagsLink.exists()).toBe(true)

    const menLink = wrapper.find('a[href="#men"]')
    expect(menLink.exists()).toBe(true)

    const womenLink = wrapper.find('a[href="#women"]')
    expect(womenLink.exists()).toBe(true)
  })

  test('closes products dropdown when clicked again', async () => {
    const wrapper = mount(Navbar)

    // Click twice on the products dropdown button to open and then close it
    const productsDropdownButton = wrapper.find('button[aria-label="Products"]')
    await productsDropdownButton.trigger('click')
    await productsDropdownButton.trigger('click')

    // Check if dropdown items are no longer visible
    const shoesLink = wrapper.find('a[href="#shoes"]')
    expect(shoesLink.exists()).toBe(false)

    const bagsLink = wrapper.find('a[href="#bags"]')
    expect(bagsLink.exists()).toBe(false)

    const menLink = wrapper.find('a[href="#men"]')
    expect(menLink.exists()).toBe(false)

    const womenLink = wrapper.find('a[href="#women"]')
    expect(womenLink.exists()).toBe(false)
  })

  test('renders correctly when products dropdown is closed on mobile view', async () => {
    setWindowSize(375, 667) // Set to a common mobile screen size

    const wrapper = mount(Navbar)

    // Check if the mobile menu button exists
    const mobileMenuButton = wrapper.find('[aria-label="Open main menu"]')
    expect(mobileMenuButton.exists()).toBe(true)

    // Check if the logo is rendered on mobile view
    const logo = wrapper.find('img[alt="Petstore logo"]')
    expect(logo.exists()).toBe(true)
  })
})
