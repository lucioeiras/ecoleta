import { Request, Response } from 'express';

import knex from '../database/connection';

class ItemsController {
  async index(req: Request, res: Response) {
    const items = await knex('items').select('*');
  
    /* 
      Serialização: Transformar os dados para que os mesmos 
      sejam mais acessíveis pra quem está acessando-os. 
    */
    const serializedItems = items.map(item => {
      return { 
        id: item.id,
        title: item.title,
        image_url: `http://localhost:3333/uploads/${item.image}`,
      }
    })
  
    return res.json(serializedItems);
  }
}

export default new ItemsController();