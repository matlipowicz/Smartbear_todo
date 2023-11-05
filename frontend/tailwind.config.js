export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
        'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
        './node_modules/tailwind-datepicker-react/dist/**/*.js',
    ],
    theme: {
        extend: {
            colors: {
                'bright-purple-100': '#8687E7',
                'bright-purple-200': '#8875FF',
                'bright-purple-300': '#8E7CFF',

                'gray-100': '#979797',
                'gray-200': '#363636',
                'gray-300': '#272727',
                'gray-400': '#1D1D1D',

                'red-100': '#FF4949',
                'category-red': '#CC4173',
                'category-orange': '#CC8441',
                'category-yellow-100': '#C9CC41',
                'category-yellow-200': '#FFCC80',
                'category-green': '#66CC41',
                'category-turquiose': '#41CCA7',
                'category-blue-100': '#41A2CC',
                'category-blue-200': '#4181CC',
                'category-purple-200': '#809CFF',
                'category-purple-100': '#9741CC',
                'test-black': '#121212',
            },
            fontFamily: {
                lato: ['Lato', 'sans-serif'],
            },

            gridTemplateRows: {
                'main-rows': 'min-content 1fr 6.25rem',
            },

            height: {
                25: '6.25rem',
            },
            variants: {
                fill: ['hover', 'focus'], // this line does the trick
            },
            minHeight: {
                taskHeight: '6rem',
                taskModalHeight: '21.25rem',
            },
        },
    },
    // plugins: [require('flowbite/plugin')],
    plugins: [],
};
