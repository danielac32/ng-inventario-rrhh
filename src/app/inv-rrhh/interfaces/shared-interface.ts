export interface Message {
  title?: string;
  component?:string;
  content?: string;
  type?:number;
  enable:boolean;
  error:boolean;
}