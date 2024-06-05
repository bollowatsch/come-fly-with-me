import { createApp } from 'vue'


// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VDateInput } from 'vuetify/labs/VDateInput'
import { VNumberInput } from 'vuetify/labs/VNumberInput'

// Components
import App from './App.vue'



const vuetify = createVuetify({
    components:{
        ...components,
        VDateInput,
        VNumberInput
    },
    directives,
    theme:{
    defaultTheme: 'dark',
        themes: {
            light: {
                dark: false,
                colors: {
                    'primary': '#237eb5', // primary color
                    'on-primary': '#ffffff', // text color on primary
                    'primary-darken-1': '#1f6e9c', // darker shade of primary
                    'secondary': '#8A8D93', // secondary color
                    'secondary-darken-1': '#7C7F84', // darker shade of secondary
                    'on-secondary': '#ffffff', // text color on secondary
                    'success': '#56CA00', // success color
                    'success-darken-1': '#4DB600', // darker shade of success
                    'on-success': '#ffffff', // text color on success
                    'info': '#16B1FF', // info color
                    'info-darken-1': '#149FE6', // darker shade of info
                    'on-info': '#ffffff', // text color on info
                    'warning': '#FFB400', // warning color
                    'warning-darken-1': '#E6A200', // darker shade of warning
                    'on-warning': '#ffffff', // text color on warning
                    'error': '#FF4C51', // error color
                    'error-darken-1': '#E64449', // darker shade of error
                    'on-error': '#ffffff', // text color on error
                    'background': '#f4f5fa', // background color
                    'on-background': '#2E263D', // text color on background
                    'surface': '#ffffff', // surface color
                    'on-surface': '#2E263D', // text color on surface
                    'grey-50': '#FAFAFA', // grey shade 50
                    'grey-100': '#F5F5F5', // grey shade 100
                    'grey-200': '#EEEEEE', // grey shade 200
                    'grey-300': '#E0E0E0', // grey shade 300
                    'grey-400': '#BDBDBD', // grey shade 400
                    'grey-500': '#9E9E9E', // grey shade 500
                    'grey-600': '#757575', // grey shade 600
                    'grey-700': '#616161', // grey shade 700
                    'grey-800': '#424242', // grey shade 800
                    'grey-900': '#212121', // grey shade 900
                    'perfect-scrollbar-thumb': '#dbdade', // scrollbar thumb color
                    'skin-bordered-background': '#ffffff', // bordered background
                    'skin-bordered-surface': '#ffffff', // bordered surface
                    'expansion-panel-text-custom-bg': '#fafafa', // expansion panel background
                    'track-bg': '#F0F2F8', // track background
                    'chat-bg': '#F7F6FA', // chat background
                },
                variables: {
                    'code-color': '#d400ff', // code color
                    'overlay-scrim-background': '#2E263D', // overlay background
                    'tooltip-background': '#1A0E33', // tooltip background
                    'overlay-scrim-opacity': 0.5, // overlay opacity
                    'hover-opacity': 0.04, // hover opacity
                    'focus-opacity': 0.1, // focus opacity
                    'selected-opacity': 0.08, // selected opacity
                    'activated-opacity': 0.16, // activated opacity
                    'pressed-opacity': 0.14, // pressed opacity
                    'dragged-opacity': 0.1, // dragged opacity
                    'disabled-opacity': 0.4, // disabled opacity
                    'border-color': '#2E263D', // border color
                    'border-opacity': 0.12, // border opacity
                    'table-header-color': '#F6F7FB', // table header color
                    'high-emphasis-opacity': 0.9, // high emphasis opacity
                    'medium-emphasis-opacity': 0.7, // medium emphasis opacity
                    'shadow-key-umbra-color': '#2E263D', // shadow color
                    'shadow-xs-opacity': '0.16', // shadow xs opacity
                    'shadow-sm-opacity': '0.18', // shadow sm opacity
                    'shadow-md-opacity': '0.20', // shadow md opacity
                    'shadow-lg-opacity': '0.22', // shadow lg opacity
                    'shadow-xl-opacity': '0.24', // shadow xl opacity
                },
            },
            dark: {
                dark: true,
                colors: {
                    'primary': '#237eb5', // primary color
                    'on-primary': '#ffffff', // text color on primary
                    'primary-darken-1': '#1f6e9c', // darker shade of primary
                    'secondary': '#8A8D93', // secondary color
                    'secondary-darken-1': '#7C7F84', // darker shade of secondary
                    'on-secondary': '#ffffff', // text color on secondary
                    'success': '#56CA00', // success color
                    'success-darken-1': '#4DB600', // darker shade of success
                    'on-success': '#ffffff', // text color on success
                    'info': '#16B1FF', // info color
                    'info-darken-1': '#149FE6', // darker shade of info
                    'on-info': '#ffffff', // text color on info
                    'warning': '#FFB400', // warning color
                    'warning-darken-1': '#E6A200', // darker shade of warning
                    'on-warning': '#ffffff', // text color on warning
                    'error': '#FF4C51', // error color
                    'error-darken-1': '#E64449', // darker shade of error
                    'on-error': '#ffffff', // text color on error
                    'background': '#353c47', // background color
                    'on-background': '#E0E0E0', // text color on background
                    'surface': '#3c444f', // surface color
                    'on-surface': '#E0E0E0', // text color on surface
                    'grey-50': '#414953', // grey shade 50
                    'grey-100': '#49525d', // grey shade 100
                    'grey-200': '#5a646f', // grey shade 200
                    'grey-300': '#6b7681', // grey shade 300
                    'grey-400': '#7c8793', // grey shade 400
                    'grey-500': '#8d98a5', // grey shade 500
                    'grey-600': '#9ea9b7', // grey shade 600
                    'grey-700': '#afbaca', // grey shade 700
                    'grey-800': '#c0cbdc', // grey shade 800
                    'grey-900': '#d1dce5', // grey shade 900
                    'perfect-scrollbar-thumb': '#5a646f', // scrollbar thumb color
                    'skin-bordered-background': '#3c444f', // bordered background
                    'skin-bordered-surface': '#3c444f', // bordered surface
                    'expansion-panel-text-custom-bg': '#414953', // expansion panel background
                    'track-bg': '#49525d', // track background
                    'chat-bg': '#3c444f', // chat background
                },
                variables: {
                    'code-color': '#d400ff', // code color
                    'overlay-scrim-background': '#353c47', // overlay background
                    'tooltip-background': '#F7F4FF', // tooltip background
                    'overlay-scrim-opacity': 0.5, // overlay opacity
                    'hover-opacity': 0.04, // hover opacity
                    'focus-opacity': 0.1, // focus opacity
                    'selected-opacity': 0.08, // selected opacity
                    'activated-opacity': 0.16, // activated opacity
                    'pressed-opacity': 0.14, // pressed opacity
                    'disabled-opacity': 0.4, // disabled opacity
                    'dragged-opacity': 0.1, // dragged opacity
                    'border-color': '#E0E0E0', // border color
                    'border-opacity': 0.12, // border opacity
                    'table-header-color': '#3D3759', // table header color
                    'high-emphasis-opacity': 0.9, // high emphasis opacity
                    'medium-emphasis-opacity': 0.7, // medium emphasis opacity
                    'shadow-key-umbra-color': '#131120', // shadow color
                    'shadow-xs-opacity': '0.20', // shadow xs opacity
                    'shadow-sm-opacity': '0.22', // shadow sm opacity
                    'shadow-md-opacity': '0.24', // shadow md opacity
                    'shadow-lg-opacity': '0.26', // shadow lg opacity
                    'shadow-xl-opacity': '0.28', // shadow xl opacity
                },
            },
        },
        /* OLD THEME (PURPLE)
        themes: {
            light: {
                dark: false,
                colors: {
                    'primary': '#8C57FF',
                    'on-primary': '#fff',
                    'primary-darken-1': '#7E4EE6',
                    'secondary': '#8A8D93',
                    'secondary-darken-1': '#7C7F84',
                    'on-secondary': '#fff',
                    'success': '#56CA00',
                    'success-darken-1': '#4DB600',
                    'on-success': '#fff',
                    'info': '#16B1FF',
                    'info-darken-1': '#149FE6',
                    'on-info': '#fff',
                    'warning': '#FFB400',
                    'warning-darken-1': '#E6A200',
                    'on-warning': '#fff',
                    'error': '#FF4C51',
                    'error-darken-1': '#E64449',
                    'on-error': '#fff',
                    'background': '#f4f5fa',
                    'on-background': '#2E263D',
                    'surface': '#fff',
                    'on-surface': '#2E263D',
                    'grey-50': '#FAFAFA',
                    'grey-100': '#F5F5F5',
                    'grey-200': '#EEEEEE',
                    'grey-300': '#E0E0E0',
                    'grey-400': '#BDBDBD',
                    'grey-500': '#9E9E9E',
                    'grey-600': '#757575',
                    'grey-700': '#616161',
                    'grey-800': '#424242',
                    'grey-900': '#212121',
                    'perfect-scrollbar-thumb': '#dbdade',
                    'skin-bordered-background': '#fff',
                    'skin-bordered-surface': '#fff',
                    'expansion-panel-text-custom-bg': '#fafafa',
                    'track-bg': '#F0F2F8',
                    'chat-bg': '#F7F6FA',
                },
                variables: {
                    'code-color': '#d400ff',
                    'overlay-scrim-background': '#2E263D',
                    'tooltip-background': '#1A0E33',
                    'overlay-scrim-opacity': 0.5,
                    'hover-opacity': 0.04,
                    'focus-opacity': 0.1,
                    'selected-opacity': 0.08,
                    'activated-opacity': 0.16,
                    'pressed-opacity': 0.14,
                    'dragged-opacity': 0.1,
                    'disabled-opacity': 0.4,
                    'border-color': '#2E263D',
                    'border-opacity': 0.12,
                    'table-header-color': '#F6F7FB',
                    'high-emphasis-opacity': 0.9,
                    'medium-emphasis-opacity': 0.7,

                    // 👉 shadows
                    'shadow-key-umbra-color': '#2E263D',
                    'shadow-xs-opacity': '0.16',
                    'shadow-sm-opacity': '0.18',
                    'shadow-md-opacity': '0.20',
                    'shadow-lg-opacity': '0.22',
                    'shadow-xl-opacity': '0.24',
                },
            },
            dark: {
                dark: true,
                colors: {
                    'primary': '#8C57FF',
                    'on-primary': '#fff',
                    'primary-darken-1': '#7E4EE6',
                    'secondary': '#8A8D93',
                    'secondary-darken-1': '#7C7F84',
                    'on-secondary': '#fff',
                    'success': '#56CA00',
                    'success-darken-1': '#4DB600',
                    'on-success': '#fff',
                    'info': '#16B1FF',
                    'info-darken-1': '#149FE6',
                    'on-info': '#fff',
                    'warning': '#FFB400',
                    'warning-darken-1': '#E6A200',
                    'on-warning': '#fff',
                    'error': '#FF4C51',
                    'error-darken-1': '#E64449',
                    'on-error': '#fff',
                    'background': '#28243D',
                    'on-background': '#E7E3FC',
                    'surface': '#312d4b',
                    'on-surface': '#E7E3FC',
                    'grey-50': '#2A2E42',
                    'grey-100': '#2F3349',
                    'grey-200': '#4A5072',
                    'grey-300': '#5E6692',
                    'grey-400': '#7983BB',
                    'grey-500': '#8692D0',
                    'grey-600': '#AAB3DE',
                    'grey-700': '#B6BEE3',
                    'grey-800': '#CFD3EC',
                    'grey-900': '#E7E9F6',
                    'perfect-scrollbar-thumb': '#4a5072',
                    'skin-bordered-background': '#312d4b',
                    'skin-bordered-surface': '#312d4b',
                    'expansion-panel-text-custom-bg': '#373350',
                    'track-bg': '#474360',
                    'chat-bg': '#373452',
                },
                variables: {
                    'code-color': '#d400ff',
                    'overlay-scrim-background': '#312D4B',
                    'tooltip-background': '#F7F4FF',
                    'overlay-scrim-opacity': 0.5,
                    'hover-opacity': 0.04,
                    'focus-opacity': 0.1,
                    'selected-opacity': 0.08,
                    'activated-opacity': 0.16,
                    'pressed-opacity': 0.14,
                    'disabled-opacity': 0.4,
                    'dragged-opacity': 0.1,
                    'border-color': '#E7E3FC',
                    'border-opacity': 0.12,
                    'table-header-color': '#3D3759',
                    'high-emphasis-opacity': 0.9,
                    'medium-emphasis-opacity': 0.7,

                    // 👉 Shadows
                    'shadow-key-umbra-color': '#131120',
                    'shadow-xs-opacity': '0.20',
                    'shadow-sm-opacity': '0.22',
                    'shadow-md-opacity': '0.24',
                    'shadow-lg-opacity': '0.26',
                    'shadow-xl-opacity': '0.28',
                },
            },
         }
         */

    }
})
createApp(App).use(vuetify).mount('#app')
