export { Colors as default, Color, Colors, Shades };

const Colors = {
    lemon: '#F4CE14',
    green: '#495E57',
    text: '#11181C',
    paper: 'white',
    error: '#ea8556'
} as const;

const Shades = {
    green: {
        '10%': '#e7ebeb',
        '5%': '#f2f4f3'
    }, text: {
        '66%': '#626769'
    },
    error: {
        '33%': '#fbdabb',
        '10%': '#fef3e9'
    }
} as const satisfies {
    [K in keyof typeof Colors]?: Record<string, string>
}

type Color = typeof Colors[keyof typeof Colors];