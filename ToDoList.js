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
    #toDoListArr = [];

    constructor(args) {
        try {
            if(!existsSync(ToDoList.#fileName)) {
                writeFileSync(ToDoList.#fileName, '[]');
            } else {
                this.#toDoListArr = JSON.parse(readFileSync(ToDoList.#fileName, 'utf8'));
            }
        } catch(err) {
            console.error(err)
        }
        
        // ['-a', 'Buy apple', '-l', 'KEFE', '-c', '2']
        if (args.length === 0) {
            this.printHelp();
        } else {
            while (args.length) {
                const arg = args.shift();
                switch (arg) {
                    case '-a':
                        const elToAdd = args.shift();
                        elToAdd ? this.appendItem(elToAdd) : console.log('Missing to do item');
                        break;
                    case '-c':
                        const elSerialToCompleteStr= args.shift();
                        const elSerialToCompleteNo = Number(elSerialToCompleteStr);
                        elSerialToCompleteNo > 0 ? this.completTask(elSerialToCompleteNo) : console.log(`Invalid index ${elSerialToCompleteStr}`);
                        break;
                    case '-r':
                        const elSerialToDeleteStr= args.shift();
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

            try {
                writeFileSync(ToDoList.#fileName, JSON.stringify(this.#toDoListArr));
            } catch (error) {
                console.log(error.message);               
            }
        }
    }

    printHelp() {
        console.log(ToDoList.#help);
    }    
    printList() {
        if(this.#toDoListArr.length === 0) {
            console.log('Nincs mára tennivalód! :)');
            return;
        }
        this.#toDoListArr.forEach((item, index) => {
            console.log(`${index + 1} - ${item.status ? 'Done       ' : 'Uncompleted'} - ${item.todo} `);
        });
    }
    appendItem(item) {
        this.#toDoListArr.push({todo: item, status: false});
    }
    completTask(index) {
        if (index > this.#toDoListArr.length) {
            console.log(`No item with such a big index as ${index}!`);
            return;
        }
        this.#toDoListArr[index - 1].status = true;
    }
    deleteTask(index) {
        if (index > this.#toDoListArr.length) {
            console.log(`No item with such a big index as ${index}!`);
            return;
        }
        this.#toDoListArr = this.#toDoListArr.filter( item => item !== this.#toDoListArr[index - 1]);
    }
}
