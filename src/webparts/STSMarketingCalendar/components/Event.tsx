import * as React from 'react';
import styles from './STSMarketingCalendar.module.scss';
import { IEvent, IResponseItem, IRefListCampaigns, IRefList_AssetType, IFilters } from "../interfaces";
import { IGlobalProps } from './STSMarketingCalendar';
import * as moment from 'moment';
import { EventDetail } from './EventDetail'

export interface IEventState {
  IRefListCampaigns: IRefListCampaigns[];
  ATypeCatalog: IRefList_AssetType[];
  items: IEvent[];
  errors: string[];
  filters: IFilters[];
}
export default class Event extends React.Component<IGlobalProps, IEventState> {
  constructor(props: IGlobalProps) {
    super(props);
    this.state = {
      ATypeCatalog: [],
      IRefListCampaigns: [],
      items: [],
      errors: [],
      filters: []
    };
  }
  public componentDidMount() {
    this._readData("WorkList_Social_Calendar");

  }
  componentWillUnmount() {

  }
  public render(): React.ReactElement<IGlobalProps> {
    
    //Set Color for the cards
    function SetColor(Sub_x002d_team: string) {
      switch (Sub_x002d_team) {
        case 'Advocacy | NPI':
          return styles.tag3
        case 'Advocacy | Special Content':
          return styles.tag3
        case 'Advocacy | Customers':
          return styles.tag3
        case 'Advocacy | Events':
          return styles.tag3
        case 'Industries':
          return styles.tag5
        case 'Product | Releases':
          return styles.tag1
        case 'Product | Launch':
          return styles.tag1
        case 'Product | All the rest':
          return styles.tag1
        default:
          return styles.tag0
      }
    }

    return (
      <div>
        {this.state.items.map((item, idx) => {
          return (
            <div data-id={idx} className={`${styles.event} ${SetColor(item.Sub_x002d_team)}`}>
              <p className={`${styles.title}`}>{item.Title.length < 35 ?  item.Title : item.Title.substring(0,35)+"..."}</p>
              <div>{item.Solutions}</div>     
              <div className={`${styles.time}`}>                           
                <span className={`${styles.label}`}>{this.SetIndustry(item.IndustryId)}</span>
                <EventDetail IGlobalProps={this.props} IEvent={item} />
              </div>              
            </div>
          );
        })}
        <div className={`${styles.blank}`}>
        </div>
      </div>
    );
  }
  
  SetIndustry(IndustryId: number) {
    try {
      if (IndustryId !== undefined && IndustryId !== null) {
        const found = this.props.RLCCatalog.find(obj => {
          return obj.ID === IndustryId;
        });
        const result = found.Title.split("-");
        return result[0];
      }
    }
    catch { return ""; }
  }

  private _readData = async (ListName: string) => {
    try {
      let date: string = (moment(this.props.date)).toISOString();
      let date2: string = (moment(this.props.date)).toISOString();
      date = `${date.substring(0, date.indexOf('T'))}T00:00:00Z`;
      date2 = `${date.substring(0, date.indexOf('T'))}T23:59:59Z`;      
      var stringfilter = `PublishDate ge datetime'${date}' and PublishDate le datetime'${date2}'`;     
      if(this.props.filters[0].Value.length < 0 ) {stringfilter = stringfilter + ` and Marketinggoals eq '${ this.props.filters[0].Value}'`;}      
      if(this.props.filters[1].Value.length < 0 ) {stringfilter = stringfilter + ` and Promoted_x0020_asset eq '${this.props.filters[0].Value}'`;}      
      const response: any[] = await this.props.sp.web.lists.
        getByTitle(ListName).items
        .filter(stringfilter)
        .orderBy("Modified", true)();       
      for (let i = 0; i < response.length; i++) {
        const items: IEvent[] = response.map((item: IResponseItem) => {
          return {
            ID: item.ID,
            Title: item.Title,
            NewTitle: item.NewTitle,
            PublishDate: moment(item.PublishDate).format('MMMM Do YYYY'),
            Requesteddate:  moment(item.Requesteddate).format('MMMM Do YYYY'),
            Status: item.Status,
            Quarter: item.Quarter,
            Promoted_x0020_asset: item.Promoted_x0020_asset,
            IndustryId: item.IndustryId,
            Sub_x002d_team: item.Sub_x002d_team,
            SocialChannels: item.SocialChannels,
            Marketinggoals: item.Marketinggoals,
            CampaignId: item.CampaignId,
            Solutions: item.Solutions,
            Comments: item.Comments,
            Created: moment(item.Created).format('MMMM Do YYYY'),
          };
        });
        

        this.setState({ items });
      }
    } catch (error) {
      console.log(error);
      // set a new state conserving the previous state + the new error
      this.setState({ errors: [...this.state.errors, error] });
    }
  }
}
