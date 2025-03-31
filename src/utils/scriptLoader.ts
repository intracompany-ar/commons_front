export function loadScript(src: string) {
    if (!document.querySelector(`script[src="${src}"]`)) {
        const script = document.createElement('script');
        script.defer = true;
        script.src = src;
        document.head.appendChild(script);
    }
}
