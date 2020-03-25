import { Request, Response } from 'express';

const neatCsv = require('neat-csv');
const fs = require('fs');

export function winners(req: Request, res: Response) {
    const parseCsv = req.body.toggleCSV === 'true';

    const winnersNo: number = Number(req.body.winnersNo);
    if (parseCsv) {
        const file = req.files.csv;
        file.mv(__dirname + '/tmpFiles/server.csv', (err) => {
            if (err) {
                console.error(err);
                return errorResponse(res, 400, 'error occurred with copying csv file');
            } else {
                console.log('file moved successfully');
            }
        });
        fs.readFile(__dirname + '/tmpFiles/server.csv', async (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            const pureCsvData = await (neatCsv(data));
            if (pureCsvData && pureCsvData.length > 0) {
                const candidates = pureCsvData.reduce((a, c) => [...a, ...Object.values(c)], [])
                    .filter(candidate => candidate && candidate.length > 0);
                handleResponse(candidates, winnersNo, res);
            } else {
                return errorResponse(res, 400, 'error occurred with reading csv file');
            }
        });
    } else {
        const candidates = req.body.candidates.split(',');
        handleResponse(candidates, winnersNo, res);
    }

}

const handleResponse = (candidates: string[], winnersNo: number, res: Response) => {
    let theWinners = [];
    if (candidates.length >= winnersNo) {
        theWinners = generateWinners(candidates, winnersNo);
        if (theWinners && theWinners.length > 0) {
            if (theWinners.length === winnersNo) {
                return successResponse(res, theWinners);
            } else {
                return errorResponse(res, 400, 'Found less winners than the specified winners number');
            }
        } else {
            return errorResponse(res, 400, 'error occurred with generating winners');
        }
    } else {
        return errorResponse(res, 400, 'Winners number is greater than the total number of candidates');
    }
};

const successResponse = (res: Response, theWinners: string[]) => {
    setTimeout(() => {
        res.status(200).send({
            success: 'true',
            winners: theWinners
        });
    }, 500);
}

const errorResponse = (res: Response, status: number, message: string) => {
    setTimeout(() => {
        res.status(status).send({
            success: 'false',
            message
        });
    }, 500);
};

const generateWinners = (candidates: string[], winnersNo: number): string[] => {
    const theWinners = [];
    if (candidates.length === winnersNo) {
        return candidates;
    }
    const shuffledCandidates = shuffle(candidates);

    shuffledCandidates.filter(candidate => !theWinners.includes(candidate))
        .map(candidate => theWinners.push(candidate));
    if (theWinners.length >= winnersNo) {
        return theWinners.slice(0, winnersNo);
    } else {
        return theWinners;
    }
};

const shuffle = (array: string[]): string[] => {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};
