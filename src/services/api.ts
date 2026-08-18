import axios from 'axios';
import { products } from '@/data/products';
import { posts } from '@/data/posts';
import type { Post, Product } from '@/types';

export const api = axios.create({
  baseURL: 'https://api.collectors-hub.local',
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API error:', error?.message ?? error);
    return Promise.reject(error);
  }
);

function delay<T>(data: T, ms = 600): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

export async function fetchProducts(): Promise<Product[]> {
  return delay(products);
}

export async function fetchProductById(id: string): Promise<Product | undefined> {
  return delay(products.find((p) => p.id === id));
}

export async function fetchPosts(): Promise<Post[]> {
  return delay(posts);
}

export async function fetchPostById(id: string): Promise<Post | undefined> {
  return delay(posts.find((p) => p.id === id));
}
