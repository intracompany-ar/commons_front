export const today = document.head.querySelector('meta[name="today"]')
    ? document.head.querySelector('meta[name="today"]').content
    : '';

export const urlBase = document.head.querySelector('meta[name="url-base"]')
    ? document.head.querySelector('meta[name="url-base"]').content
    : '';

export const csrf = document.head.querySelector('meta[name="csrf-token"]')
    ? document.head.querySelector('meta[name="csrf-token"]').content
    : 0;

export const authId = document.head.querySelector('meta[name="auth-id"]')
    ? parseInt(document.head.querySelector('meta[name="auth-id"]').content)
    : 0;

export const authName = document.head.querySelector('meta[name="auth-name"]')
    ? document.head.querySelector('meta[name="auth-name"]').content
    : null;

export const authEmail = document.head.querySelector('meta[name="auth-email"]')
    ? document.head.querySelector('meta[name="auth-email"]').content
    : null;

export const appId = document.head.querySelector('meta[name="app-id"]')
    ? parseInt(document.head.querySelector('meta[name="app-id"]').content)
    : null;

export const personId = document.head.querySelector('meta[name="person-id"]')
    ? parseInt(document.head.querySelector('meta[name="person-id"]').content)
    : null;

export const personFirstName = document.head.querySelector('meta[name="person-first-name"]')
    ? document.head.querySelector('meta[name="person-first-name"]').content
    : null;

export const profilePhoto = document.head.querySelector('meta[name="profile-photo"]')
    ? document.head.querySelector('meta[name="profile-photo"]').content
    : null;

export const actualizopassw = document.head.querySelector('meta[name="actualizopassw"]')
    ? document.head.querySelector('meta[name="actualizopassw"]').content
    : null;