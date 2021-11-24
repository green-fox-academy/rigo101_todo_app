'use strict';
import { readFileSync, writeFileSync } from 'fs';
 
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
        if (this.args.length === 2 && this.args[0] === '-a') this.appendItem(this.args[1]);
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
    appendItem(item) {
        try {
            const toDoListArr = JSON.parse(readFileSync('todoslist.json', 'utf8'));
            toDoListArr.push({todo: item});
            writeFileSync('todoslist.json', JSON.stringify(toDoListArr).split(',').join(',\n'));
        } catch (error) {
            console.log(error.message);
        }
    }
}
