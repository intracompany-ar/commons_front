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
        let modal = modals[i] as HTMLElement;
        if (modal.classList.contains('show')) {
            modal.classList.remove('show');
            modal.style.display = 'none';
            document.body.classList.remove('modal-open'); // por si agregás fondo bloqueado
            let backdrop = document.querySelector('.modal-backdrop');
            if (backdrop) backdrop.remove();
        }
    }
}

export function openModal(modalId: string) {
    let element = document.getElementById(modalId);
    if (element) {
        element.classList.add('show'); // Agrega la clase para mostrar el modal
        element.style.display = 'block'; // Cambia el estilo para hacerlo visible
        document.body.classList.add('modal-open'); // Evita el scroll en el fondo

        // Crear y agregar un fondo (backdrop)
        let backdrop = document.createElement('div');
        backdrop.className = 'modal-backdrop';
        backdrop.style.position = 'fixed';
        backdrop.style.top = '0';
        backdrop.style.left = '0';
        backdrop.style.width = '100%';
        backdrop.style.height = '100%';
        backdrop.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        backdrop.style.zIndex = '1040';
        document.body.appendChild(backdrop);

        // Cerrar el modal al hacer clic en el fondo
        backdrop.addEventListener('click', () => closeModal(modalId));
    } else { console.error('No existe el modal_id'); }
}


export function closeModal(modalId: string) {
    let element = document.getElementById(modalId);
    if (element) {
        element.classList.remove('show'); // Quita la clase para ocultar el modal
        element.style.display = 'none'; // Cambia el estilo para ocultarlo
        document.body.classList.remove('modal-open'); // Permite el scroll en el fondo

        // Eliminar el fondo (backdrop)
        let backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) backdrop.remove();
    } else {
        console.error('No existe el modal_id');
    }
}