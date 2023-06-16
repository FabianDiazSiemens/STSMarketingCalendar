import * as React from "react";
//Components
import { STSCalendar } from './STSCalendar';
import styles from "./STSMarketingCalendar.module.scss";
/*MAIN CONTAINER*/
export default class STSMarketingCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            IRefListCampaigns: [],
            IATypeCatalog: [],
            IFilters: [],
            items: [],
            errors: []
        };
    }
    render() {
        return (React.createElement("div", null,
            React.createElement(STSCalendar, { "data-key": 0, IGlobalProps: this.props }),
            React.createElement("div", null, this._gerErrors()),
            React.createElement("small", null,
                React.createElement("a", { href: "https://siemensnam.sharepoint.com/teams/disw_SharePointEnablement/", className: styles.copyright, target: "blank" }, "Sp 2023"))));
    }
    _gerErrors() {
        return this.state.errors.length > 0
            ?
                React.createElement("div", { style: { color: "orangered" } },
                    React.createElement("div", null, "Errors:"),
                    this.state.errors.map((item, idx) => {
                        return (React.createElement("div", { key: idx }, JSON.stringify(item)));
                    }))
            : null;
    }
}
//# sourceMappingURL=STSMarketingCalendar.js.map