import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "flightbuddy", appId: "1:923789910530:web:17b26a10e753072addfd1b", storageBucket: "flightbuddy.firebasestorage.app", apiKey: "AIzaSyBf75Zx2pgRAMRLkHhRSLg9dC7jZAgZudQ", authDomain: "flightbuddy-ce655.firebaseapp.com", messagingSenderId: "923789910530" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
