import express, { Application, Request, Response, NextFunction } from 'express';
import moment from 'moment';


const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${moment().format()} - ${req.protocol}://${req.get('host')}${req.originalUrl}`);
  next();
}

export function log(str: string){
  console.log(`${moment().format()} - ${str}`);
}

export function logQuery(str: string){
  console.log(`${moment().format()} - db query: ${str}`);
}

export default logger;