import {InjectionToken } from "@angular/core";

export interface Toastr {
    success (msg: string, title?:string):void;
    info (msg: string, title?:string): void;
    warning (msg: string, title?:string): void;
    error (msg: string, title?:string):void;
}

export let TOASTR_TOKEN = new InjectionToken<Toastr>('toastr')
