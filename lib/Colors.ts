export { Colors as default, Color };

const Colors = {
    lemon: '#F4CE14',
    green: '#495E57',
    text: '#11181C',
    paper: 'white'
} as const;

type Color = typeof Colors[keyof typeof Colors];