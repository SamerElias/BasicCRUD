import express, { Application, Request, Response, NextFunction } from 'express';
import Query from './queries';
import logger, { log, logQuery } from '../middleware/logger';
import User from '../model/User';
const Pool = require('pg').Pool

require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});


export const getUsers = async (request: Request, response: Response) => {
  const query = Query.getUsers;
  logQuery(query);
  let out;
  await pool.query(query, (err: any, res: any) => {
    if (err) {
      console.error(err);
      response.status(500).json({ error: 'server error' });
      return;
    }
    let out: string[] = res.rows;
    if(out === undefined || out.length == 0){
      log(`no data found`);
      response.status(404).json({ error: 'no data found' });
    } else {
      log('data retrieved successfully!');
      response.json(res.rows);
    }
  });
};
export const getUserById = (request: Request, response: Response) => {
  const id = request.params.id;
  const query = Query.getUser(id);
  logQuery(query);
  pool.query(query, (err: any, res: any) => {
    if (err) {
      console.error(err);
      response.status(500).json({ error: 'server error' });
      return;
    }
    let out: string[] = res.rows;
    if(out === undefined || out.length == 0){
      log(`no data found for id: ${request.params.id}`);
      response.status(404).json({ error: 'user does not exist' });
    } else {
      log('data retrieved successfully!');
      response.json(res.rows).status(200);
    }
  });
};
export const addUser = (request: Request, response: Response) => {
  const body = request.body;
  const user = new User(body.username, body.email, body.firstname, body.lastname, body.password);
  const query = Query.addUser(user);
  logQuery(query);
  pool.query(query, (err: any, res: any) => {
    if (err) {
      console.error(err);
      if(err.code === '23505'){
        response.status(404).json({ error: 'user already exists' });
        return;
      }
      response.status(500).json({ error: 'server error' });
    } else {
      response.status(201).json({info: 'successfully added'});
    }
  });
};
export const removeUser = (request: Request, response: Response) => {
  const user = request.params.id;
  const query = Query.removeUser(user);
  logQuery(query);
  pool.query(query, (err: any, res: any) => {
    if (err) {
      console.error(err);
      response.status(500).json({ error: 'server error' });
    } else {
      if(res.rowCount === 0){
        response.status(200).json({ info: 'user did not exist' });
        return;
      }
      response.status(200).json({info: 'successfully deleted'});
    }
  });
};