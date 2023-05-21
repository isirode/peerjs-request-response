export interface Response<BodyType = unknown> {
  id: string;
  payload: BodyType | undefined;
  wasCancelled?: boolean;
}