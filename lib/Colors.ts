export { Colors as default, Color, Colors, Shades };

const Colors = {
    lemon: '#F4CE14',
    green: '#495E57',
    text: '#11181C',
    paper: 'white'
} as const;

const Shades = {
    green: {
        '10%': '#e7ebeb'
    }
} as const satisfies {
    [K in keyof typeof Colors]?: Record<string, string>
}

type Color = typeof Colors[keyof typeof Colors];