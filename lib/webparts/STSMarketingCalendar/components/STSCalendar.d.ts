import "react-datepicker/dist/react-datepicker.css";
import { IRefListCampaigns, IRefList_AssetType, IFilters } from "../interfaces";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
export interface IGlobalState {
    items: IRefListCampaigns[];
    itemsAT: IRefList_AssetType[];
    errors: string[];
    filters: IFilters[];
}
export declare const STSCalendar: ({ IGlobalProps }: {
    IGlobalProps: any;
}) => JSX.Element;
//# sourceMappingURL=STSCalendar.d.ts.map