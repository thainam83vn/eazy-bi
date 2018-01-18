import { BaseModel} from './base-model'; 

export class Datasource extends BaseModel {
  constructor(props){
    super(props);
  }


  name: string;
  setting = {
    type: 'csv',
    fileName: 'f1.csv',
    fileContent:''
  };
  data = [];
}