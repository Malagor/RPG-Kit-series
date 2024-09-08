import { Vector2 } from "./Vector2.ts";
import { IResource } from "./Resources.ts";

export interface IPickUpItemData {
  image: IResource;
  position: Vector2;
}
