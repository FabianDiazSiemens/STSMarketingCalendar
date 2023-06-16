var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { PropertyPaneTextField } from '@microsoft/sp-property-pane';
import * as strings from 'STSMarketingCalendarStrings';
import STSMarketingCalendar from './components/STSMarketingCalendar';
import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/fields";
export default class STSMarketingCalendarWebPart extends BaseClientSideWebPart {
    onInit() {
        const _super = Object.create(null, {
            onInit: { get: () => super.onInit }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.onInit.call(this);
            this.sp = spfi().using(SPFx(this.context));
            this._getStatusOptions();
            this.ATypeCatalog = yield this._getRefList_AssetType("RefList_AssetType");
            this.CampaignCatalog = yield this._getRefList_Campaigns("RefList_Campaigns");
            this.IndustryCatalog = yield this._getRefList_Industries("RefList_Industries");
            this._getSubteamOptions();
            this._getSocialChannelsOptions();
            this._getMarketinggoalsOptions();
        });
    }
    _getStatusOptions() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const StatusOptions = yield this.sp.web.lists.getByTitle("WorkList_Social_Calendar")
                    .fields
                    .getByTitle('Status')()
                    .then((fieldInfo) => {
                    this.StatusCatalog = fieldInfo.Choices.map((text, key) => ({ key, text }));
                });
                console.log("StatusCatalog");
                console.log(this.StatusCatalog);
                return StatusOptions;
            }
            catch (error) {
                console.log(error);
                return;
            }
        });
    }
    _getRefList_AssetType(ListName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ATCresponse = yield this.sp.web.lists
                    .getByTitle(ListName).items();
                const ATItems = ATCresponse.map((item) => {
                    return {
                        key: item.ID,
                        text: item.Title
                    };
                });
                return ATItems;
            }
            catch (error) {
                console.log(error);
                return [];
            }
        });
    }
    _getRefList_Campaigns(ListName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const GLCresponse = yield this.sp.web.lists
                    .getByTitle(ListName)
                    .items
                    .select("ID, Industry_x0020_Name/Title")
                    .expand("Industry_x0020_Name")();
                const RLCItems = GLCresponse.map((item) => {
                    return {
                        ID: item.ID,
                        Title: item.Industry_x0020_Name.Title
                    };
                });
                console.log("RefList_Campaigns");
                console.log(RLCItems);
                return RLCItems;
            }
            catch (error) {
                console.log(error);
                return [];
            }
        });
    }
    _getRefList_Industries(ListName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const IndustryResponse = yield this.sp.web.lists
                    .getByTitle(ListName)
                    .items
                    .select("ID, Title, IndustryAbbreviation, IndustryMgrs/Name, IndustryShort")
                    .expand("IndustryMgrs")();
                const IndustryItems = IndustryResponse.map((item) => {
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
            }
            catch (error) {
                console.log(error);
                return [];
            }
        });
    }
    _getSubteamOptions() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const SubteamResponse = yield this.sp.web.lists.getByTitle("WorkList_Social_Calendar")
                    .fields
                    .getByTitle('Sub-team')()
                    .then((fieldInfo) => {
                    this.SubteamCatalog = fieldInfo.Choices.map((text, key) => ({ key, text }));
                });
                console.log("SubteamCatalog");
                console.log(this.SubteamCatalog);
                return this.SubteamCatalog;
            }
            catch (error) {
                console.log(error);
                return;
            }
        });
    }
    _getSocialChannelsOptions() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(yield this.sp.web.lists.getByTitle("WorkList_Social_Calendar").fields());
                yield this.sp.web.lists.getByTitle("WorkList_Social_Calendar")
                    .fields;
                const SocialChannelsOptions = yield this.sp.web.lists.getByTitle("WorkList_Social_Calendar")
                    .fields
                    .getByInternalNameOrTitle('SocialChannels')()
                    .then((fieldInfo) => {
                    this.SocialChannelsCatalog = fieldInfo.Choices.map((text, key) => ({ key, text }));
                });
                console.log("SocialChannelsCatalog");
                console.log(this.SocialChannelsCatalog);
                return this.SocialChannelsCatalog;
            }
            catch (error) {
                console.log(error);
                return;
            }
        });
    }
    _getMarketinggoalsOptions() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const SocialChannelsOptions = yield this.sp.web.lists.getByTitle("WorkList_Social_Calendar")
                    .fields
                    .getByTitle('Marketing goals | KPI')()
                    .then((fieldInfo) => {
                    this.MarketinggoalsCatalog = fieldInfo.Choices.map((text, key) => ({ key, text }));
                });
                console.log("MarketinggoalsCatalog");
                console.log(this.MarketinggoalsCatalog);
                return this.MarketinggoalsCatalog;
            }
            catch (error) {
                console.log(error);
                return;
            }
        });
    }
    get dataVersion() {
        return Version.parse('3.0');
    }
    getPropertyPaneConfiguration() {
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
    render() {
        const element = React.createElement(STSMarketingCalendar, {
            date: '',
            description: this.properties.description,
            sp: this.sp,
            RLCCatalog: this.CampaignCatalog,
            ATypeCatalog: this.ATypeCatalog,
            filters: this.filters
        });
        ReactDom.render(element, this.domElement);
    }
}
//# sourceMappingURL=STSMarketingCalendarWebPart.js.map