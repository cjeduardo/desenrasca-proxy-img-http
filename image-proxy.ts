import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch'; // Optional, depends on Node version

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { src } = req.query;

  if (!src || typeof src !== 'string' || !src.startsWith('http://')) {
    return res.status(400).send('Invalid or missing src query param.');
  }

  try {
    const response = await fetch(src);
    const contentType = response.headers.get('content-type') || 'image/jpeg';

    res.setHeader('Content-Type', contentType);
    response.body.pipe(res);
  } catch (error) {
    res.status(500).send('Failed to fetch image.');
  }
}
