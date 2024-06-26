declare module '@/assets/images/*.jpg' {
    const Src: ImageURISource;
    export default Src
}

declare module '@/assets/images/*.jpeg' {
    const Src: ImageURISource;
    export default Src
}

declare module '@/assets/images/*.png' {
    const Src: ImageURISource;
    export default Src
}

interface ImageURISource {
    uri?: string | undefined;
    bundle?: string | undefined;
    method?: string | undefined;
    headers?: {[key: string]: string} | undefined;
    cache?: 'default' | 'reload' | 'force-cache' | 'only-if-cached' | undefined;
    body?: string | undefined;
    width?: number | undefined;
    height?: number | undefined;
    scale?: number | undefined;
}