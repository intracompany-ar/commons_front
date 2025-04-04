import axios from 'axios'
import type { AxiosResponse, AxiosError } from 'axios'

export function useBlob() {
    /**
     * url publica o firmada. Ejemplo https://cdn.iceo.ar/files/adsfasdf.png
     * @param {string} url
     * @param {string} name
     */
    function downloadFront(url: string, name = 'download')
    {
        fetch(url)
            .then(res => res.blob())
            .then(blob => {
                const blobUrl = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = blobUrl
                a.download = name
                a.style.display = 'none'
                document.body.appendChild(a)
                a.click()
                document.body.removeChild(a)
                URL.revokeObjectURL(blobUrl)
            })
    }

    function showPdf(url:string, params = {}){
        getFile(url, 'application/pdf', false, null, params)
    }

    function downloadXls(url:string){
        getFile(url, 'application/vnd.ms-excel', true)
    }

    function downloadTxt(url:string, fileName = null, params = {}){
        getFile(url, 'text/plain', true, fileName, params)
    }

    function download(fileId: number)
    {
        const url = `file/download/${fileId}`;
        getFile(url, undefined, true, null);
    }

    function downloadUrlTemporalFile(temporal:string)
    {
        axios.get<{ url: string }>(`file/download/${temporal}`)
            .then((response: AxiosResponse<{ url: string }>) => {
                const url = response.data.url; // URL temporal de S3
                window.open(url, '_blank');
            })
            .catch((error: AxiosError) => console.error("Error al obtener la imagen:", error));

    }
    
    function show(fileId: number)
    {
        const url = `file/showFile/${fileId}`;
        getFile(url, undefined, false);
    }

    function getFile(url:string, typeHeader: string | undefined = undefined, download = false, fileName = null, params = {})
    {
        axios(url, {params: params, responseType: 'blob'})
            .then(response => {
                const contentDisposition = response.headers['content-disposition'];

                if (!fileName && contentDisposition) {
                    const matches = contentDisposition.match(/filename="?([^"]+)"?/);
                    if (matches && matches[1]) {
                        fileName = matches[1];
                    }
                }

                const blob = new Blob([response.data], { type: typeHeader ?? response.headers['content-type'] });
                const blobUrl = window.URL.createObjectURL(blob);
                if (download) {
                    const link = document.createElement('a');
                    link.href = blobUrl;
                    link.download = fileName ?? 'download';  // Ajusta el nombre del archivo si es necesario
                    document.body.appendChild(link); // Necesario para Firefox
                    link.click();
                    document.body.removeChild(link); // Limpia el DOM
                    window.URL.revokeObjectURL(blobUrl); // Limpia la URL del objeto
                } else {
                    window.open(blobUrl, '_blank');  // Abre el archivo en una nueva pestaña
                }
            })
            .catch((error) => { console.error('Error:', error); });
    }

    return { showPdf, show, download, downloadXls, downloadTxt, downloadUrlTemporalFile, downloadFront }
}