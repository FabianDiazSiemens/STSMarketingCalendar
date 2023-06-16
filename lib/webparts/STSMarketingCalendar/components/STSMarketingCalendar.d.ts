import * as React from "react";
import { IRefListCampaigns, IRefList_AssetType, IFilters } from "../interfaces";
import { SPFI } from "@pnp/sp";
export interface IGlobalProps {
    date: string;
    description: string;
    sp: SPFI;
    RLCCatalog: IRefListCampaigns[];
    ATypeCatalog: IRefList_AssetType[];
    filters: IFilters[];
}
export interface IGlobalState {
    IRefListCampaigns: IRefListCampaigns[];
    IATypeCatalog: IRefList_AssetType[];
    IFilters: IFilters[];
    items: IRefListCampaigns[];
    errors: string[];
}
export default class STSMarketingCalendar extends React.Component<IGlobalProps, IGlobalState> {
    constructor(props: IGlobalProps);
    render(): React.ReactElement<IGlobalProps>;
    private _gerErrors;
}
//# sourceMappingURL=STSMarketingCalendar.d.ts.map