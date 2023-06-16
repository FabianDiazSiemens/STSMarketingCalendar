import * as React from 'react';
import { IEvent, IRefListCampaigns, IRefList_AssetType, IFilters } from "../interfaces";
import { IGlobalProps } from './STSMarketingCalendar';
export interface IEventState {
    IRefListCampaigns: IRefListCampaigns[];
    ATypeCatalog: IRefList_AssetType[];
    items: IEvent[];
    errors: string[];
    filters: IFilters[];
}
export default class Event extends React.Component<IGlobalProps, IEventState> {
    constructor(props: IGlobalProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): React.ReactElement<IGlobalProps>;
    SetIndustry(IndustryId: number): string;
    private _readData;
}
//# sourceMappingURL=Event.d.ts.map