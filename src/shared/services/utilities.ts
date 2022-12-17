import { FormControl } from "@angular/forms";

export function restrictedWords(words: string[]) {
    return (control: FormControl) : {[key: string]: any} => {
        if (!words) return null;
        var invalidWords = words.map(x => control.value.includes(x) ? x : null)
        .filter(x => x!== null)
        return invalidWords && invalidWords.length > 0 ? { 'restrictedWords': invalidWords.join(',')} : null;
    }
}

export function SortAsc(a:any, b:any, propertyName:string) {
    if (a[propertyName] > b[propertyName]) return 1;
    else if (a[propertyName] === b[propertyName]) return 0;
    else return -1;
}