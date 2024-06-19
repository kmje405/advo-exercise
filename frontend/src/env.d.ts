/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly FIREBASEAPIKEY: string;
  readonly FIREBASEAUTHDOMAIN: string;
  readonly FIREBASEPROJECTID: string;
  readonly FIREBASESTORAGEBUCKET: string;
  readonly FIREBASEMESSAGINGSENDERID: string;
  readonly FIREBASEAPPID: string;
  readonly FIREBASEMEASUREMENTID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}