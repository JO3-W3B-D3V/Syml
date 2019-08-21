const path = require("path");
const fs = require("fs");
const file = path.join(__dirname, "coverage//lcov.info");
const empty = () => {};

fs.readFile(file, "utf-8", (error, data) => {
    const replace = `${__dirname}\\`;
    const getUpdatedData = (d) => d.replace(replace, '');
    let updated = getUpdatedData(data);

    const loop = () => {
        if (updated.indexOf(replace) > -1) {
            updated = getUpdatedData(updated);
            fs.writeFile(file, updated, empty);
            loop();
        }
    };

    loop();

});