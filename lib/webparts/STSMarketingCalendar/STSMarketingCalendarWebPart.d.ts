import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import "@pnp/sp/fields";
import { IGenericList } from './interfaces';
export interface IMainProps {
    description: string;
}
export default class STSMarketingCalendarWebPart extends BaseClientSideWebPart<IMainProps> {
    private sp;
    private StatusCatalog;
    private ATypeCatalog;
    private IndustryCatalog;
    private SubteamCatalog;
    private SocialChannelsCatalog;
    private MarketinggoalsCatalog;
    private CampaignCatalog;
    private filters;
    onInit(): Promise<void>;
    _getStatusOptions(): Promise<void>;
    _getRefList_AssetType(ListName: string): Promise<any[]>;
    _getRefList_Campaigns(ListName: string): Promise<any[]>;
    private _getRefList_Industries;
    _getSubteamOptions(): Promise<IGenericList[]>;
    _getSocialChannelsOptions(): Promise<IGenericList[]>;
    _getMarketinggoalsOptions(): Promise<IGenericList[]>;
    protected get dataVersion(): Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
    render(): void;
}
//# sourceMappingURL=STSMarketingCalendarWebPart.d.ts.map