export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
        'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
        './node_modules/tailwind-datepicker-react/dist/**/*.js',
        './node_modules/react-tailwindcss-select/dist/index.esm.js',
    ],
    theme: {
        extend: {
            colors: {
                'bright-purple-100': '#8687E7',
                'bright-purple-200': '#8875FF',
                'bright-purple-300': '#8E7CFF',

                'complete-task-green': '#77dd77',
                'complete-task-red': '#ff6961',

                'big-calendar-task-complete-100': '#073F39',
                'big-calendar-task-complete-200': '#0C6151',

                'gray-100': '#979797',
                'gray-200': '#363636',
                'gray-300': '#272727',
                'gray-400': '#1D1D1D',

                'red-100': '#FF4949',
                'category-red': '#CC4173',
                'category-orange': '#CC8441',
                'category-yellow-100': '#FFCC80',
                'category-yellow-200': '#ffbe5c',
                'category-green': '#66CC41',
                'category-turquiose': '#41CCA7',
                'category-blue-100': '#41A2CC',
                'category-blue-200': '#4181CC',
                'category-purple-100': '#809CFF',
                'category-purple-200': '#9741CC',
                'black-edit': '#121212',
            },
            fontFamily: {
                lato: ['Lato', 'sans-serif'],
            },

            gridTemplateRows: {
                'mobile-main-rows': 'min-content 1fr 6.25rem',
                'desktop-main-rows': '1fr',
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
                timePickerInput: '4rem',
            },
            minWidth: {
                timePickerInput: '4rem',
                taskModal: '21.875rem',
                taskEditParagraph: '6.5625rem',
            },
            maxWidth: {
                datePickerWidth: '28.75rem',
                taskModal: '34rem',
                editPage: '37.5rem',
            },
            fontSize: {
                clamp: 'clamp(1rem, 5vw, 3rem)',
            },
            translate: {
                translateModalX: '75%',
            },
        },
    },
    // plugins: [require('flowbite/plugin')],
    plugins: [],
};
