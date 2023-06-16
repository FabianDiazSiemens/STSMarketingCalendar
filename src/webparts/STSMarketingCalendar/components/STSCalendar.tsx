import * as React from "react";
import { useState } from "react";
import styles from "./STSMarketingCalendar.module.scss";
//Componet 
import { format, addDays, lastDayOfWeek, startOfWeek, getWeek, addWeeks, subWeeks, subDays } from "date-fns";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Event from './Event'

//Internal
import { IRefListCampaigns, IRefList_AssetType, IFilters } from "../interfaces";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

import { Icon } from '@fluentui/react/lib/Icon';
import { Dropdown, DropdownMenuItemType, IDropdownOption, IDropdownStyles } from '@fluentui/react/lib/Dropdown';

import { DefaultButton } from '@fluentui/react/lib/Button';
import { Panel } from '@fluentui/react/lib/Panel';
import { useBoolean } from '@fluentui/react-hooks';


import { SPFI } from "@pnp/sp";
export interface IGlobalState {
    items: IRefListCampaigns[];
    itemsAT: IRefList_AssetType[];
    errors: string[];
    filters: IFilters[];
}

export const STSCalendar = ({ IGlobalProps }) => {

    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth));
    const [startDate, setStartDate] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));

    /*Calendar*/
    //Changue the value state of the week
    const changeWeekHandle = (btnType) => {
        if (btnType === "prev") {
            setStartDate((date) => {
                return subDays(date, 7);
            });
            setCurrentMonth(subWeeks(currentMonth, 1));
            setCurrentWeek(getWeek(subWeeks(currentMonth, 1)));
        }
        if (btnType === "next") {
            setStartDate((date) => {
                return addDays(date, 7);
            });
            setCurrentMonth(addWeeks(currentMonth, 1));
            setCurrentWeek(getWeek(addWeeks(currentMonth, 1)));
        }
    };
    const ExampleCustomInput = ({ value, onClick, }: { value?: any; onClick?: any; }) => (
        <Icon iconName="Calendar" onClick={onClick} className={styles.icon} />
    );
    const renderCells = () => {
        const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 6 });
        const dateFormat = "d ";
        const dateFormatMonth = " MMM ";
        const dateFormatWeek = "EEE";
        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = "";
        let formattedDateMonth = "";
        let formattedDateWeek = "";
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, dateFormat);
            formattedDateMonth = format(day, dateFormatMonth);
            formattedDateWeek = format(day, dateFormatWeek);
            days.push(
                <div data-key={day} className={`${styles.view}`} style={{ display: "inline-block" }}>
                    <div>{formattedDateMonth}</div>
                    <div className={styles.datenum}>{formattedDate}</div>
                    <div className={styles.dateday}>{formattedDateWeek}</div>
                    <div className={`${styles.events}`}>
                        <Event key={day.toString()} date={day.toString()}
                            sp={IGlobalProps.sp}
                            RLCCatalog={IGlobalProps.RLCCatalog}
                            ATypeCatalog={IGlobalProps.ATypeCatalog}
                            description="Event Component" filters={filters} />
                    </div>
                </div>
            );
            day = addDays(day, 1);
        }
        rows.pop();
        rows.push(<div data-key={day} className={`${styles.day}`}>{days}</div>);
        days = [];

        return (
            <div >
                <div className={`${styles.days}`}>{rows}</div>
            </div>
        );
    };


    //Catalogs
    //TODO: Get the values from the list on another class and store then on a main state
    const StatusOptions = [
        { key: 0, text: "Requested" },
        { key: 1, text: "Confirmed by SM advocates" },
        { key: 2, text: "Added in the calendar" },
        { key: 3, text: "Content submitted" },
        { key: 4, text: "Posted" },
        { key: 5, text: "On hold" },
        { key: 6, text: "Declined (Read comments box)" }
    ];
    //Marketing Owner
    const MarketinOwner = [];//Person identifier
    

    //Industry  Get from the List RefList_Industries
    const IndustryItems = [];
    //Sub-team Get from the List detail
    const SubteamItems = [
        { key: 0, text: "NPI | Engineer Innovation" },
        { key: 1, text: "NPI | Earth Week" },
        { key: 2, text: "NPI | Healthier World" },
        { key: 3, text: "NPI | Sustainable world" }
    ];
    
    const MarketinggoalsOptions = [
        { key: 0, text: "Awareness | Impressions" },
        { key: 1, text: "Lead Generation | Registrations/Conversions" },
        { key: 2, text: "Website Traffic | Clicks (LP)" },
        { key: 3, text: "Engagement | Engagement rate" }
    ];
    const CampaignItems = [];
    const SolutionsItems = [];
    /*
    Campaign
    Solutions*/

    /*Filters */
    const ATItems: IRefList_AssetType[] = IGlobalProps.ATypeCatalog;

    const [FilterMGselectedDrop, setFilterMGselectedDrop] = useState<IDropdownOption>();
    const [FilterMGselected, setFilterMGselected] = useState("");
    const [FilterATselected, setFilterATselected] = useState("");
    const [FilterStatusselected, setFilterStatusSelected] = useState("");
    const [FilterIndustryselected, setFilterIndustrySelected] = useState("");
    const [FilterSubTeamselected, setFilterSubTeamSelected] = useState("");
    const [FilterMGKPIselected, setFilterMGKPISelected] = useState("");
    const [FilterCampaingselected, setFilterCampaingSelected] = useState("");
    const [FilterSolutionsselected, setFilterSolutionsSelected] = useState("");



    const [filters, setFilters] = useState([{ List: 'RefList_Campaigns', Value: FilterMGselected }, { List: 'RefList_AssetType', Value: FilterATselected }]);



    /*FILTER HANDLING*/
    const setGeneralFilters = () => {
        setFilters([
            { List: 'RefList_Campaigns', Value: FilterMGselected },
            { List: 'RefList_AssetType', Value: FilterATselected },
            { List: 'Status', Value: FilterStatusselected },
            { List: 'Industry ', Value: FilterIndustryselected },
            { List: 'Sub-team ', Value: FilterSubTeamselected },
            { List: 'Marketinggoals', Value: FilterMGKPIselected },
            { List: 'Campaign ', Value: FilterCampaingselected },
            { List: 'Status', Value: FilterSolutionsselected },
        ]);
    };

    const handleChangeMG = (event, option, index) => {
        setFilterMGselectedDrop(option.key);
        setFilterMGselected(option.key);
        setGeneralFilters();

    }
    const handleChangeAT = (event, option, index) => {
        setFilterATselected(option.key);
        setGeneralFilters();
    }
    const handleChangeStatus = (event, option, index) => {
        setFilterStatusSelected(option.key);
        setGeneralFilters();
    }
    const handleChangeIndustry = (event, option, index) => {
        setFilterIndustrySelected(option.key);
        setGeneralFilters();
    }
    const handleChangeSubTeam = (event, option, index) => {
        setFilterSubTeamSelected(option.key);
        setGeneralFilters();
    }
    const handleChangeMGKPI = (event, option, index) => {
        setFilterMGKPISelected(option.key);
        setGeneralFilters();
    }
    const handleChangeCampaing = (event, option, index) => {
        setFilterCampaingSelected(option.key);
        setGeneralFilters();
    }
    const handleChangeSolutions = (event, option, index) => {
        setFilterSolutionsSelected(option.key);
        setGeneralFilters();
    }

    const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);    
    return (
        <div>
            <div>
                <div>
                    <div>
                        <Panel isLightDismiss isOpen={isOpen} onDismiss={dismissPanel} closeButtonAriaLabel="Close" headerText="Filter by">
                            <div className="ms-Grid">


                                <div className="ms-Grid-row">
                                    <Dropdown label="Status" onChange={handleChangeStatus} placeholder="Select an option" selectedKey={FilterStatusselected} options={StatusOptions} />
                                </div>

                                <div className="ms-Grid-row">
                                    <Dropdown label="Asset Type" onChange={handleChangeAT} placeholder="Select an option" selectedKey={FilterATselected} options={ATItems} />
                                </div>
                                <div className="ms-Grid-row">
                                    <Dropdown label="Marketing Owner" onChange={handleChangeMG} placeholder="Select an option" selectedKey={FilterMGselected} options={MarketinOwner} />
                                </div>
                                <div className="ms-Grid-row">
                                    <Dropdown label="Industry" onChange={handleChangeIndustry} placeholder="Select an option" selectedKey={FilterIndustryselected} options={IndustryItems} />
                                </div>
                                <div className="ms-Grid-row">
                                    <Dropdown label="Sub-team" onChange={handleChangeSubTeam} placeholder="Select an option" selectedKey={FilterSubTeamselected} options={SubteamItems} />
                                </div>
                                <div className="ms-Grid-row">
                                    <Dropdown label="Marketing Goals | KPI" onChange={handleChangeMGKPI} placeholder="Select an option" selectedKey={FilterMGKPIselected} options={MarketinggoalsOptions} />
                                </div>
                                <div className="ms-Grid-row">
                                    <Dropdown label="Campaign" onChange={handleChangeCampaing} placeholder="Select an option" selectedKey={FilterCampaingselected} options={CampaignItems} />
                                </div>
                                <div className="ms-Grid-row">
                                    <Dropdown label="Solutions" onChange={handleChangeSolutions} placeholder="Select an option" selectedKey={FilterSolutionsselected} options={SolutionsItems} />
                                </div>

                            </div>
                        </Panel>
                        <div className="ms-Grid">
                            <div className="ms-Grid-row">
                                <div className="ms-Grid-col ms-sm8 ms-md8 ms-lg8"></div>
                                <div className="ms-Grid-col ms-sm1 ms-md1 ms-lg1">
                                    <Icon iconName="CaretSolidLeft" onClick={() => changeWeekHandle("prev")} className={styles.icon} /></div>
                                <div className="ms-Grid-col ms-sm1 ms-md1 ms-lg1">
                                    <DatePicker selected={startDate} className={styles.icon} onChange={(date) => setStartDate(date)} customInput={<ExampleCustomInput />} /></div>
                                <div className="ms-Grid-col ms-sm1 ms-md3 ms-lg1">
                                    <Icon iconName="CaretSolidRight" onClick={() => changeWeekHandle("next")} className={styles.icon} /></div>
                                <div className="ms-Grid-col ms-sm1 ms-md3 ms-lg1">
                                    <Icon iconName="Filter" className={styles.icon} onClick={() => { openPanel() }} /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>{renderCells()}</div>
        </div >
    );

}

