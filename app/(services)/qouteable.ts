// lib/api.ts (or similar path)

import { QouteLengthType } from '../types';

const API_URL = 'https://api.quotable.io';

export type QuoteType = {
  _id: string;
  content: string;
  author: string;
  authorSlug: string;
  tags: string[];
  length: number;
  dateAdded: string;
  dateModified: string;
  statusCode?: number;
};

export async function getRandomQuoteByLength(
  length: QouteLengthType,
  tags?: string[] | null,
  abortController?: AbortController | null
): Promise<QuoteType> {
  const url = new URL('/quotes/random', API_URL);

  const params = new URLSearchParams();

  if (tags?.length) {
    params.append('tags', tags.join('|'));
  }

  switch (length) {
    case 'short':
      params.append('maxLength', '100');
      break;
    case 'medium':
      params.append('minLength', '101');
      params.append('maxLength', '250');
      break;
    case 'long':
      params.append('minLength', '251');
      break;
  }

  url.search = params.toString();

  const response = await fetch(url.toString(), {
    method: 'GET',
    signal: abortController?.signal,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch quote: ${response.statusText}`);
  }

  const data = await response.json();
  return Array.isArray(data) ? data[0] : data;
}

export async function getQuoteTagList(): Promise<string[]> {
  const response = await fetch(`${API_URL}/tags`);
  if (!response.ok) {
    throw new Error('Failed to fetch tags');
  }

  const data = await response.json();
  return data;
}
