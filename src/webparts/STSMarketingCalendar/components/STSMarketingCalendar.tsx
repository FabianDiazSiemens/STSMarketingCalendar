import * as React from "react";
import { useState } from "react";

//Internal
import { IRefListCampaigns, IRefList_AssetType, IFilters } from "../interfaces";
import { SPFI } from "@pnp/sp";

//Components
import { STSCalendar } from './STSCalendar'
import styles from "./STSMarketingCalendar.module.scss";

export interface IGlobalProps {
  date: string;
  description: string;
  sp: SPFI;  
  RLCCatalog: IRefListCampaigns[];
  ATypeCatalog: IRefList_AssetType[];
  filters:  IFilters[];
}

export interface IGlobalState {
  IRefListCampaigns: IRefListCampaigns[];
  IATypeCatalog: IRefList_AssetType[];
  IFilters: IFilters[];
  items: IRefListCampaigns[];
  errors: string[];
}

/*MAIN CONTAINER*/
export default class STSMarketingCalendar extends React.Component<IGlobalProps, IGlobalState> {

  constructor(props: IGlobalProps) {
    super(props);
    this.state = {
      IRefListCampaigns: [],
      IATypeCatalog: [],
      IFilters:[],
      items: [],
      errors: []
    };
  }
 
  public render(): React.ReactElement<IGlobalProps> {    
    return (
      <div>       
        <STSCalendar data-key={0} IGlobalProps={this.props}/>
        <div>
          {this._gerErrors()}
        </div>  
        <small><a href="https://siemensnam.sharepoint.com/teams/disw_SharePointEnablement/" className={styles.copyright} target="blank">Sp 2023</a></small>   
      </div>
    );
  } 

  private _gerErrors() {
    return this.state.errors.length > 0
      ?
      <div style={{ color: "orangered" }} >
        <div>Errors:</div>
        {
          this.state.errors.map((item, idx) => {
            return (<div key={idx} >{JSON.stringify(item)}</div>);
          })
        }
      </div>
      : null;
  }
}
