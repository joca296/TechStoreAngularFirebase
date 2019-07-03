import { AlertType } from './AlertType';

export class Alert {
  type:AlertType;
  heading:string;
  messages:string[] = new Array<string>();
}
