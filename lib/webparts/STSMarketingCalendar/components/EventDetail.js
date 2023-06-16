import * as React from 'react';
import { mergeStyleSets, DefaultButton, FocusTrapZone, Layer, Overlay, Popup } from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';
import styles from './STSMarketingCalendar.module.scss';
import 'office-ui-fabric-react/dist/css/fabric.css';
import { Icon } from '@fluentui/react/lib/Icon';
const popupStyles = mergeStyleSets({
    root: {
        background: 'rgba(0, 0, 0, 0.2)',
        bottom: '0',
        left: '0',
        position: 'fixed',
        right: '0',
        top: '0',
    },
    content: {
        background: 'white',
        left: '50%',
        maxWidth: '600px',
        padding: '0 2em 2em',
        position: 'absolute',
        top: '50%',
        transform: 'translate(-50%, -50%)',
    },
});
export const EventDetail = ({ IGlobalProps, IEvent }) => {
    const item = IEvent;
    const [isPopupVisible, { setTrue: showPopup, setFalse: hidePopup }] = useBoolean(false);
    function SetIndustry(IndustryId) {
        try {
            if (IndustryId !== undefined && IndustryId !== null) {
                const found = IGlobalProps.RLCCatalog.find(obj => {
                    return obj.ID === IndustryId;
                });
                return "Industry: " + found.Title;
            }
        }
        catch (_a) {
            return "";
        }
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(Icon, { iconName: "CirclePlus", onClick: showPopup }),
        isPopupVisible && (React.createElement(Layer, { className: styles.dialog },
            React.createElement(Popup, { className: popupStyles.root, role: "dialog", "aria-modal": "true", onDismiss: hidePopup },
                React.createElement(Overlay, { onClick: hidePopup }),
                React.createElement(FocusTrapZone, null,
                    React.createElement("div", { className: "ms-Grid", dir: "ltr" },
                        React.createElement("div", { className: "ms-Grid-row" },
                            React.createElement("div", { className: "ms-Grid-col ms-sm4 ms-xl4" }, "A"),
                            React.createElement("div", { className: "ms-Grid-col ms-sm8 ms-xl8" }, "B"))),
                    React.createElement("div", { className: popupStyles.content },
                        React.createElement("h2", null, item.NewTitle),
                        React.createElement("div", null,
                            React.createElement("div", null,
                                React.createElement("div", null,
                                    React.createElement("label", null, "Requested date")),
                                React.createElement("div", { className: styles.data }, item.Requesteddate)),
                            React.createElement("div", null,
                                React.createElement("div", null,
                                    React.createElement("label", null, "Published Date")),
                                React.createElement("div", { className: styles.data }, item.PublishDate)),
                            React.createElement("div", null,
                                React.createElement("div", null,
                                    React.createElement("label", null, "Status")),
                                React.createElement("div", { className: styles.data }, item.Status)),
                            React.createElement("div", null,
                                React.createElement("div", null,
                                    React.createElement("label", null, "Quarter")),
                                React.createElement("div", { className: styles.data }, item.Quarter)),
                            React.createElement("div", null,
                                React.createElement("div", null,
                                    React.createElement("label", null, "Asset Type")),
                                React.createElement("div", { className: styles.data }, item.Promoted_x0020_asset)),
                            React.createElement("div", null,
                                React.createElement("div", null,
                                    React.createElement("label", null, "Industry")),
                                React.createElement("div", { className: styles.data }, item.IndustryId != undefined || item.IndustryId != null ? SetIndustry(item.IndustryId) : "")),
                            React.createElement("div", null,
                                React.createElement("div", null,
                                    React.createElement("label", null, "Sub-team")),
                                React.createElement("div", { className: styles.data }, item.Sub_x002d_team)),
                            React.createElement("div", null,
                                React.createElement("div", null,
                                    React.createElement("label", null, "Amplify only?")),
                                React.createElement("div", { className: styles.data }, item.SocialChannels)),
                            React.createElement("div", null,
                                React.createElement("div", null,
                                    React.createElement("label", null, "Marketing goals | KPI ")),
                                React.createElement("div", { className: styles.data }, item.Marketinggoals)),
                            React.createElement("div", null,
                                React.createElement("div", null,
                                    React.createElement("label", null, "Campaign ")),
                                React.createElement("div", { className: styles.data }, item.CampaignId)),
                            React.createElement("div", null,
                                React.createElement("div", null,
                                    React.createElement("label", null, "Solutions ")),
                                React.createElement("div", { className: styles.data }, item.Solutions))),
                        React.createElement("br", null),
                        React.createElement("a", { href: 'https://siemensnam.sharepoint.com/teams/disw_STSMarketingPortal/Lists/Trial_PDC_Social_Calendar/DispForm.aspx?ID=' + item.ID, target: 'blank' }, "View More"),
                        React.createElement(DefaultButton, { style: { float: "right" }, onClick: hidePopup }, "Close"))))))));
};
//# sourceMappingURL=EventDetail.js.map