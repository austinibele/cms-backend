// src/controllers/pageController.ts
import { RequestHandler } from 'express';
import { PageRepository } from '../repository/page.repository';

export const getPage: RequestHandler = (req, res) => {
  console.log('ROUTE HIT: /api/pages');
  const filters = req.query.filters;
  let slug;
  if (typeof filters === 'object' && filters !== null && 'slug' in filters) {
    slug = filters.slug;
  }
  const locale = req.query.locale;

  // Check if both slug and locale are provided
  if (!slug || !locale) {
    return res.status(400).send('Slug and locale are required.');
  }

  try {
    const page = PageRepository.getPage(slug.toString(), locale.toString());
    
    if (page) {
      res.json(page);
    } else {
      res.status(404).send('Not Found');
    }
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};