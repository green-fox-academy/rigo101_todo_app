
const help = `Parancssori Todo applikáció
=============================

Parancssori argumentumok:
    -l   Kilistázza a feladatokat
    -a   Új feladatot ad hozzá
    -r   Eltávolít egy feladatot
    -c   Teljesít egy feladatot`;


if (process.argv.slice(2).length === 0) {
    console.log(help);
}

