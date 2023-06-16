import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';


import * as strings from 'STSMarketingCalendarStrings';
import STSMarketingCalendar from './components/STSMarketingCalendar';
import { IGlobalProps } from './components/STSMarketingCalendar';

import { spfi, SPFI, SPFx } from "@pnp/sp";
import "@pnp/sp/fields";
import { IRefListCampaigns, IResponseRefListCampaigns, IRefList_AssetType, IRefList_Industries, IFilters, IGenericList } from './interfaces';
import { IResponseRefList_AssetType } from './interfaces/IResponseRefList_AssetType';
import { IResponseRefList_Industries } from './interfaces/IResponseRefList_Industries';
import { Field, IField, IFieldInfo } from "@pnp/sp/fields/types";

export interface IMainProps {
  description: string;
}

export default class STSMarketingCalendarWebPart extends BaseClientSideWebPart<IMainProps> {
  private sp: SPFI;
  
  private StatusCatalog: IGenericList[]; 
  private ATypeCatalog: IRefList_AssetType[];
  private IndustryCatalog: IRefList_Industries[];//General_List_Industries
  private SubteamCatalog: IGenericList[];
  private SocialChannelsCatalog: IGenericList[];
  private MarketinggoalsCatalog: IGenericList[];
  private CampaignCatalog: IRefListCampaigns[];

  private filters: IFilters[];

  public async onInit(): Promise<void> {
    await super.onInit();
    this.sp = spfi().using(SPFx(this.context));

    this._getStatusOptions();
    this.ATypeCatalog = await this._getRefList_AssetType("RefList_AssetType");
    this.CampaignCatalog = await this._getRefList_Campaigns("RefList_Campaigns");    
    this.IndustryCatalog = await this._getRefList_Industries("RefList_Industries");
    this._getSubteamOptions();
    this._getSocialChannelsOptions();
    this._getMarketinggoalsOptions()

  }

  public async _getStatusOptions() {
    try {
      const StatusOptions = await this.sp.web.lists.getByTitle("WorkList_Social_Calendar")
        .fields
        .getByTitle('Status')()
        .then(
          (fieldInfo: IFieldInfo & { Choices: string[] }) => {
            this.StatusCatalog = fieldInfo.Choices.map(
              (text, key) => ({ key, text })
            )
          }
        )
      console.log("StatusCatalog");
      console.log(this.StatusCatalog);
      return StatusOptions;
    } catch (error) {
      console.log(error);
      return;
    }
  }
  public async _getRefList_AssetType(ListName: string): Promise<any[]> {
    try {
      const ATCresponse: IResponseRefList_AssetType[] = await this.sp.web.lists
        .getByTitle(ListName).items();
      const ATItems: IRefList_AssetType[] = ATCresponse.map((item: IResponseRefList_AssetType) => {
        return {
          key: item.ID,
          text: item.Title
        };
      });
      return ATItems;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  public async _getRefList_Campaigns(ListName: string): Promise<any[]> {
    try {
      const GLCresponse: IResponseRefListCampaigns[] = await this.sp.web.lists
        .getByTitle(ListName)
        .items
        .select("ID, Industry_x0020_Name/Title")
        .expand("Industry_x0020_Name")();
      const RLCItems: IRefListCampaigns[] = GLCresponse.map((item: IResponseRefListCampaigns) => {
        return {
          ID: item.ID,
          Title: item.Industry_x0020_Name.Title
        };
      });
      console.log("RefList_Campaigns");
      console.log(RLCItems);
      return RLCItems;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  private async _getRefList_Industries(ListName: string): Promise<IRefList_Industries[]> {
    try {
      const IndustryResponse: IResponseRefList_Industries[] = await this.sp.web.lists
        .getByTitle(ListName)
        .items
        .select("ID, Title, IndustryAbbreviation, IndustryMgrs/Name, IndustryShort")
        .expand("IndustryMgrs")();
      const IndustryItems: IRefList_Industries[] = IndustryResponse.map((item: IResponseRefList_Industries) => {
        return {
          key: item.ID,
          text: item.Title,
          abbreviation: item.IndustryAbbreviation,
          industryMgrs: item.IndustryMgrs,
          textshort: item.IndustryShort
        };
      });
      console.log("IndustryItems");
      console.log(IndustryItems);
      this.IndustryCatalog = IndustryItems;
      return IndustryItems;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  public async _getSubteamOptions() {
    try {
      const SubteamResponse = await this.sp.web.lists.getByTitle("WorkList_Social_Calendar")
        .fields
        .getByTitle('Sub-team')()
        .then(
          (fieldInfo: IFieldInfo & { Choices: string[] }) => {
            this.SubteamCatalog = fieldInfo.Choices.map(
              (text, key) => ({ key, text })
            )
          }
        );
        console.log("SubteamCatalog");
        console.log(this.SubteamCatalog);
      return this.SubteamCatalog;
    } catch (error) {
      console.log(error);
      return;
    }
  }
  public async _getSocialChannelsOptions() {
    try {
      console.log( await this.sp.web.lists.getByTitle("WorkList_Social_Calendar").fields());
       await this.sp.web.lists.getByTitle("WorkList_Social_Calendar")
      .fields
      const SocialChannelsOptions = await this.sp.web.lists.getByTitle("WorkList_Social_Calendar")
        .fields
        .getByInternalNameOrTitle('SocialChannels')()
        .then(
          (fieldInfo: IFieldInfo & { Choices: string[] }) => {
            this.SocialChannelsCatalog = fieldInfo.Choices.map(
              (text, key) => ({ key, text })
            )
          }
        );
        console.log("SocialChannelsCatalog");
        console.log(this.SocialChannelsCatalog);
      return this.SocialChannelsCatalog;
    } catch (error) {
      console.log(error);
      return;
    }
  }
  public async _getMarketinggoalsOptions() {
    try {
      const SocialChannelsOptions = await this.sp.web.lists.getByTitle("WorkList_Social_Calendar")
        .fields
        .getByTitle('Marketing goals | KPI')()
        .then(
          (fieldInfo: IFieldInfo & { Choices: string[] }) => {
            this.MarketinggoalsCatalog = fieldInfo.Choices.map(
              (text, key) => ({ key, text })
            )
          }
        );
        console.log("MarketinggoalsCatalog");
        console.log(this.MarketinggoalsCatalog);
      return this.MarketinggoalsCatalog;
    } catch (error) {
      console.log(error);
      return;
    }
  }
  protected get dataVersion(): Version {
    return Version.parse('3.0');
  }
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
  public render(): void {
    const element: React.ReactElement<IGlobalProps> = React.createElement(
      STSMarketingCalendar,
      {
        date: '',
        description: this.properties.description,
        sp: this.sp,
        RLCCatalog: this.CampaignCatalog,
        ATypeCatalog: this.ATypeCatalog,
        filters: this.filters
      }
    );
    ReactDom.render(element, this.domElement);
  }

}

