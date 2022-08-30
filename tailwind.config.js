const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.js',
    ],

    theme: {
        fontSize: {
            'xs': '.75rem',
            'sm': '.875rem',
            'base': '1rem',
            'lg': '1.125rem',
            'xl': '1.25rem',
            '2xl': '1.5rem',
            '3xl': '1.875rem',
            '4xl': '2.25rem',
            '5xl': '3rem',
            '6xl': '4rem',
            '7xl': '5rem',
        },
        extend: {
            fontFamily: {
                sans: ['Nunito', ...defaultTheme.fontFamily.sans],
                cairo: ['cairo', ...defaultTheme.fontFamily.sans]
            },
            colors: {
                'd-blue': '#01277A',
                'd-gray': '#1F1F1F',
                'l-gray': '#6A6A6A',
                'l-blue': '#E1EDF3',
                'm-blue': '#0077B6',
                'm2-blue':"#0096C7",
                'cyan':"#48CAE4",
                'l-cyan':"#CAF0F8",
                'l-green':"#E9FFEC",
                'd-green':"#0AA45A",
                'l-red':"#FFEAEA",
                'd-red':"#F86868",
                'unread':"#EEF7F5"
            },
            
        },
    },

    plugins: [require('@tailwindcss/forms')],
};
