'use strict';
import { readFileSync } from 'fs';
 
export default class ToDoList {
    static #help = `\nParancssori Todo applikáció
=============================
    
    Parancssori argumentumok:
        -l   Kilistázza a feladatokat
        -a   Új feladatot ad hozzá
        -r   Eltávolít egy feladatot
        -c   Teljesít egy feladatot`;
    
    constructor(args) {
        this.args = args;
        if (this.args.length === 0) this.printHelp();
        if (this.args.length === 1 && this.args[0] === '-l') this.printList();
    }

    printHelp() {
        console.log(ToDoList.#help);
    }
    
    printList() {
        try {
            const toDoListArr = JSON.parse(readFileSync('todoslist.json', 'utf8'));
            if(toDoListArr.length === 0) {
                console.log('Nincs mára tennivalód! :)');
                return;
            }
            toDoListArr.forEach((item, index) => {
                console.log(`${index + 1} - ${item.todo}`);
            });
        } catch (error) {
            console.log(error.message);;
        }
    }
    
}
