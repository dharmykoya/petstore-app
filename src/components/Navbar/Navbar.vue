<template>
  <Disclosure as="nav" class="bg-company" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton
            aria-label="Open main menu"
            class="relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-company hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
          <div class="flex items-center">
            <!-- Logo -->
            <img
              class="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              alt="Petstore logo"
            />
          </div>
        </div>
        <div class="hidden sm:block sm:ml-6">
          <div class="flex items-center">
            <!-- Logo -->
            <img
              class="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              alt="Your Company"
            />
          </div>
        </div>
        <div
          class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-center"
        >
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <!-- Products Dropdown -->
              <Menu as="div" class="relative inline-block text-left">
                <div>
                  <MenuButton
                    aria-label="Products"
                    class="inline-flex w-full justify-center gap-x-1.5 rounded-md px-6 py-2 text-md text-white text-transform: uppercase hover:bg-company-700"
                  >
                    Products
                    <ChevronDownIcon
                      class="-mr-1 h-6 w-5 text-white"
                      aria-hidden="true"
                    />
                  </MenuButton>
                </div>

                <transition
                  enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                >
                  <MenuItems
                    class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <div class="py-1">
                      <MenuItem
                        v-slot="{ active }"
                        v-for="item in products"
                        :key="item.name"
                        :href="item.href"
                      >
                        <a
                          :class="[
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm',
                          ]"
                          >{{ item.name }}</a
                        >
                      </MenuItem>
                    </div>
                  </MenuItems>
                </transition>
              </Menu>

              <!-- Regular Navigation Links -->
              <a
                v-for="item in navigation"
                :key="item.name"
                :href="item.href"
                :class="[
                  item.current
                    ? 'bg-gray-900 text-white'
                    : 'text-white hover:bg-company-700',
                  'rounded-md px-6 py-2 text-md cursor-pointer text-transform: uppercase',
                ]"
                :aria-current="item.current ? 'page' : undefined"
                >{{ item.name }}</a
              >
            </div>
          </div>
        </div>
        <div class="hidden sm:block sm:ml-6">
          <div
            class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
          >
            <button
              aria-label="View cart"
              type="button"
              class="relative rounded-sm bg-company p-1 text-white flex border border-white px-6 py-3 mr-6"
            >
              <ShoppingCartIcon class="h-6 w-6 mr-2" aria-hidden="true" />
              CART (0)
            </button>
            <button
              aria-label="Login"
              type="button"
              class="relative rounded-sm bg-company p-1 text-white flex border border-white px-6 py-2.5"
            >
              LOGIN
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Menu Panel -->
    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 px-2 pb-3 pt-2">
        <!-- Products Dropdown -->
        <Menu as="div" class="relative inline-block text-left">
          <div>
            <MenuButton
              aria-label="Products"
              class="inline-flex w-full justify-center gap-x-1.5 rounded-md px-2 py-2 text-base text-white text-transform: uppercase hover:bg-company-700"
            >
              Products
              <ChevronDownIcon
                class="-mr-1 h-6 w-5 text-white"
                aria-hidden="true"
              />
            </MenuButton>
          </div>

          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <MenuItems
              class="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div class="py-1">
                <MenuItem
                  v-slot="{ active }"
                  v-for="item in products"
                  :key="item.name"
                  :href="item.href"
                >
                  <a
                    :class="[
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm',
                    ]"
                    >{{ item.name }}</a
                  >
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
        <DisclosureButton
          v-for="item in navigation"
          :key="item.name"
          as="a"
          :href="item.href"
          :class="[
            item.current
              ? 'bg-gray-900 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
            'block rounded-md text-base px-2 py-2 text-white text-transform: uppercase',
          ]"
          :aria-current="item.current ? 'page' : undefined"
          >{{ item.name }}</DisclosureButton
        >
        <button
          aria-label="View cart"
          type="button"
          class="relative rounded-sm bg-company p-1 text-white flex border border-white px-6 py-3 mr-6"
        >
          <ShoppingCartIcon class="h-6 w-6 mr-2" aria-hidden="true" />
          CART (0)
        </button>
        <button
          aria-label="Login"
          type="button"
          class="relative rounded-sm bg-company p-1 text-white flex border border-white px-6 py-2.5"
        >
          LOGIN
        </button>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/vue'
import { ShoppingCartIcon, ChevronDownIcon } from '@heroicons/vue/16/solid'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'

const navigation = [
  { name: 'Promotions', href: '#promotions', current: false },
  { name: 'Blog', href: '#blog', current: false },
]

const products = [
  { name: 'Shoes', href: '#shoes', current: false },
  { name: 'Bags', href: '#bags', current: false },
  { name: 'Men', href: '#men', current: false },
  { name: 'Women', href: '#women', current: false },
]
</script>
