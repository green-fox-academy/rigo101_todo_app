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
    }

    printHelp() {
        console.log(ToDoList.#help);
    }
    
    // printL() {
    //     if (this.args.length === 1 && this.args[0] === '-l') {
    //         console.log('barmi');
    //     }
    // }
    
}
