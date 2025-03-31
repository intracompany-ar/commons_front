import { Modal } from 'bootstrap'

export function disableSubmits() {
    const submits = document.querySelectorAll('button[type="submit"]');
    submits.forEach((submit) => {
        (submit as HTMLButtonElement).disabled = true;
    });
}

export function enableSubmits() {
    const submits = document.querySelectorAll('button[type="submit"]');
    submits.forEach((submit) => {
        (submit as HTMLButtonElement).disabled = false;
    });
}

export function showLoaders() {
    const loaders = document.getElementsByClassName('loader');
    for (let i = 0; i < loaders.length; i++) {
        (loaders[i] as HTMLElement).style.visibility = 'visible';
    }
}

export function hideLoaders() {
    const loaders = document.getElementsByClassName('loader');
    for (let i = 0; i < loaders.length; i++) {
        (loaders[i] as HTMLElement).style.visibility = 'hidden';
    }
}

export function closeModals() {
    let modals = document.getElementsByClassName('modal');
    for (let i = 0; i < modals.length; i++) {
        let modal = Modal.getInstance(modals[i]);// Getinstance toma instancia ya existente. No usar new Modal
        // // Bootstrap solo crea la instancia del modal si alguna vez fue abierto, sino es solo código
        if (modal) { modal.hide() }
    }
}

export function openModal(modalId: string) {
    let element = document.getElementById(modalId);
    if (element) {
        let modal = new Modal(element);
        modal.show();
    } else { console.error('No existe el modal_id'); }
}
