export interface Response<T = unknown> {
  id: string;
  payload: T | undefined;
  wasCancelled?: boolean;
}