'use strict';
import { readFileSync, writeFileSync, existsSync } from 'fs';
 
export default class ToDoList {
    static #fileName = 'todoslist.json';
    static #help = `\nParancssori Todo applikáció
=============================
    
    Parancssori argumentumok:
        -l   Kilistázza a feladatokat
        -a   Új feladatot ad hozzá
        -r   Eltávolít egy feladatot
        -c   Teljesít egy feladatot`;
        
    constructor(args) {
        this.args = args;
        try {
            if(!existsSync(ToDoList.#fileName)) {
                writeFileSync(ToDoList.#fileName, '[]');
            }
        } catch(err) {
            console.error(err)
        }
        
        // ['-a', 'Buy apple', '-l', 'KEFE', '-c', '2',]
        if (this.args.length === 0) {
            this.printHelp();
        } else {
            while (this.args.length) {
                const arg = this.args.shift();
                switch (arg) {
                    case '-a':
                        const elToAdd = this.args.shift();
                        elToAdd ? this.appendItem(elToAdd) : console.log('Missing to do item');
                        break;
                    case '-c':
                        const elSerialToCompleteStr= this.args.shift();
                        const elSerialToCompleteNo = Number(elSerialToCompleteStr);
                        elSerialToCompleteNo > 0 ? this.completTask(elSerialToCompleteNo) : console.log(`Invalid index ${elSerialToCompleteStr}`);
                        break;
                    case '-r':
                        const elSerialToDeleteStr= this.args.shift();
                        const elSerialToDeleteNo = Number(elSerialToDeleteStr);
                        elSerialToDeleteNo > 0 ? this.deleteTask(elSerialToDeleteNo) : console.log(`Invalid index ${elSerialToDeleteStr}`);
                        break;
                    case '-l':
                        this.printList();
                        break;
                    default:
                        console.log(`Nem támogatott argumentum!: ${arg}`);
                        this.printHelp();
                }
            }
        }
    }

    printHelp() {
        console.log(ToDoList.#help);
    }    
    printList() {
        try {
            const toDoListArr = JSON.parse(readFileSync(ToDoList.#fileName, 'utf8'));
            if(toDoListArr.length === 0) {
                console.log('Nincs mára tennivalód! :)');
                return;
            }
            toDoListArr.forEach((item, index) => {
                console.log(`${index + 1} - ${item.status ? 'Done       ' : 'Uncompleted'} - ${item.todo} `);
            });
        } catch (error) {
            console.log(error.message);
        }
    }
    appendItem(item) {
        try {
            const toDoListArr = JSON.parse(readFileSync(ToDoList.#fileName, 'utf8'));
            toDoListArr.push({todo: item, status: false});
            writeFileSync(ToDoList.#fileName, JSON.stringify(toDoListArr));
        } catch (error) {
            console.log(error.message);
        }
    }
    completTask(index) {
        try {
            const toDoListArr = JSON.parse(readFileSync(ToDoList.#fileName, 'utf8'));
            if (index > toDoListArr.length) {
                console.log(`No item with such a big index as ${index}!`);
                return;
            }
            toDoListArr[index - 1].status = true;
            writeFileSync(ToDoList.#fileName, JSON.stringify(toDoListArr));
        } catch (error) {
            console.log(error.message);
        }
    }
    deleteTask(index) {
        try {
            const toDoListArr = JSON.parse(readFileSync(ToDoList.#fileName, 'utf8'));
            if (index > toDoListArr.length) {
                console.log(`No item with such a big index as ${index}!`);
                return;
            }
            const newArr = toDoListArr.filter( item => item !== toDoListArr[index - 1]);
            writeFileSync(ToDoList.#fileName, JSON.stringify(newArr));
        } catch (error) {
            console.log(error.message);
        }
    }
}
