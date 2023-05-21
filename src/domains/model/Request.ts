export interface Request<T = unknown> {
  id: string;
  content: T;
  timeout: number;
}