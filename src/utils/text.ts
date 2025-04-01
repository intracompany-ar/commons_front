export async function copiar(textoACopiar: string) {
    const parser = new DOMParser();
    const decodedString = parser.parseFromString(textoACopiar, 'text/html').body.textContent;

    if(!decodedString) {
        return false;
    }
    try {
        await navigator.clipboard.writeText(decodedString);
        return true;
    } catch (err) {
        return false;
    }
}