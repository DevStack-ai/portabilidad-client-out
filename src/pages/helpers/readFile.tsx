import * as XLSX from 'xlsx';
function csvJSON(csv: any) {
    let lines = csv.split("\n");
    let result = [];
    let headers = lines[0].split(",");

    for (let i = 1; i < lines.length; i++) {

        let obj: any = {};
        let currentline = lines[i].split(",");
        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }

        result.push(obj);

    }
    return result //JSON
}

export const readFile = (file: any): Promise<Array<any>> => {
    console.log(file)
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = function (e: any) {
            let data = e.target.result;
            let readedData = XLSX.read(data, { type: 'binary' });
            const wsname = readedData.SheetNames[0];
            const ws = readedData.Sheets[wsname];

            /* Convert array to json*/
            const csv = XLSX.utils.sheet_to_csv(ws);

            const dataParse = csvJSON(csv)

            resolve(dataParse);
        };
        reader.readAsBinaryString(file)
    })
}