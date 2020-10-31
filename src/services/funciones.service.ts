
export async function csvToArray(bdCP: any, delimiter: string) {
    var csv = require("csvtojson");
    return new Promise(function (resolve, reject) {
        csv({
            delimiter: delimiter,
            trim: true,
            ignoreEmpty: true,
            maxRowLength: 0,
            alwaysSplitAtEOL: true
        })
            .fromString(bdCP)
            .then(function (jsonObj: any) {
                resolve(jsonObj);
            })

    });
}