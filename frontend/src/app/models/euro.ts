export class Euro {
  result:string= "";
  documentation:string= "";
  terms_of_use:string= "";
  time_last_update_unix:number= 0;
  time_last_update_utc: Date = new Date();
  time_next_update_unix:number= 0;
  time_next_update_utc: Date = new Date();
  base_code:string= "";
  target_code:string= "";
  conversion_rate: number=0;


  constructor() {
    this.result=this.result;
    this.documentation=this.documentation;
    this.terms_of_use=this.terms_of_use;
    this.time_last_update_unix=this.time_last_update_unix;
    this.time_last_update_utc=this.time_last_update_utc;
    this.time_next_update_unix=this.time_next_update_unix;
    this.time_next_update_utc=this.time_next_update_utc;
    this.base_code=this.base_code;
    this.target_code=this.target_code;
    this.conversion_rate=this.conversion_rate
  }
}
