import { removeElement } from "../store/actions";

export function createDeletion(el){
  const positions = JSON.parse(el.dataset.position);
  removeElement(positions);
}