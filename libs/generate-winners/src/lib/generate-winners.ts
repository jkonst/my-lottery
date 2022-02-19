import { Request, Response } from 'express';
import * as fs from 'fs';
import neatCsv from 'neat-csv';

export function getWinners(req: Request, res: Response) {
  const parseCsv = req.body.toggleCSV === 'true';

  const winnersNo = Number(req.body.winnersNo);
  if (parseCsv) {
    const file = req.files.csv;
    if ('mv' in file) {
      file.mv(__dirname + '/assets/tmpFiles/server.csv', err => {
        if (err) {
          console.error(err);
          return errorResponse(res, 400, 'error occurred with copying csv file');
        } else {
          console.log('file moved successfully');
        }
      });
    }
    fs.readFile(__dirname + '/assets/tmpFiles/server.csv', async (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      const pureCsvData = await neatCsv(data);
      if (pureCsvData && pureCsvData.length > 0) {
        const candidates = pureCsvData
          .reduce((a, c) => [...a, ...Object.values(c)], [])
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
  if (candidates.length < winnersNo) {
    return errorResponse(res, 400, 'Winners number is greater than the total number of candidates');
  }
  const theWinners = generateWinners(candidates, winnersNo);
  if (theWinners && theWinners.length > 0) {
    if (theWinners.length === winnersNo) {
      return successResponse(res, theWinners);
    } else {
      return errorResponse(res, 400, 'Found less winners than the specified winners number');
    }
  } else {
    return errorResponse(res, 400, 'error occurred with generating winners');
  }
};

const successResponse = (res: Response, theWinners: string[]) => {
  setTimeout(() => {
    res.status(200).send({
      success: 'true',
      winners: theWinners,
    });
  }, 500);
};

const errorResponse = (res: Response, status: number, message: string) => {
  setTimeout(() => {
    res.status(status).send({
      success: 'false',
      message,
    });
  }, 500);
};

const generateWinners = (candidates: string[], winnersNo: number): string[] => {
  if (candidates.length === winnersNo) {
    return candidates;
  }
  let theWinners = [];
  const shuffledCandidates = shuffle(candidates);

  theWinners = shuffledCandidates.filter(candidate => !theWinners.includes(candidate));
  return theWinners.length >= winnersNo ? theWinners.slice(0, winnersNo) : theWinners;
};

const shuffle = (candidates: string[]): string[] => {
  const shuffledCandidates = [...candidates];
  let currentIndex = shuffledCandidates.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = shuffledCandidates[currentIndex];
    shuffledCandidates[currentIndex] = shuffledCandidates[randomIndex];
    shuffledCandidates[randomIndex] = temporaryValue;
  }

  return shuffledCandidates;
};

