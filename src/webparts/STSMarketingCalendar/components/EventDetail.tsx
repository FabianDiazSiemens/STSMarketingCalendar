import * as React from 'react';
import { mergeStyleSets, DefaultButton, FocusTrapZone, Layer, Overlay, Popup } from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';
import { IEvent } from "../interfaces";
import { IGlobalProps } from './STSMarketingCalendar';
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
  const item: IEvent = IEvent;
  const [isPopupVisible, { setTrue: showPopup, setFalse: hidePopup }] = useBoolean(false);
  function SetIndustry(IndustryId: number) {
    try {
      if (IndustryId !== undefined && IndustryId !== null) {
        const found = IGlobalProps.RLCCatalog.find(obj => {
          return obj.ID === IndustryId;
        });
        return "Industry: " + found.Title;
      }
    }
    catch { return ""; }
  }

  return (
    <>
      <Icon iconName="CirclePlus" onClick={showPopup} />
      {isPopupVisible && (
        <Layer className={styles.dialog}>
          <Popup
            className={popupStyles.root}
            role="dialog"
            aria-modal="true"
            onDismiss={hidePopup}>
            <Overlay onClick={hidePopup} />
            <FocusTrapZone>
              <div className="ms-Grid" dir="ltr">
                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-sm4 ms-xl4">A</div>
                  <div className="ms-Grid-col ms-sm8 ms-xl8">B</div>
                </div>
              </div>
              <div className={popupStyles.content}>
                <h2>{item.NewTitle}</h2>
                <div>
                  <div>
                    <div><label>Requested date</label></div>
                    <div className={styles.data}>{item.Requesteddate}</div>
                  </div>
                  <div >
                    <div><label>Published Date</label></div>
                    <div className={styles.data}>{item.PublishDate}</div>
                  </div>
                  <div >
                    <div><label>Status</label></div>
                    <div className={styles.data}>{item.Status}</div>
                  </div>
                  <div>
                    <div><label>Quarter</label></div>
                    <div className={styles.data}>{item.Quarter}</div>
                  </div>
                  <div>
                    <div><label>Asset Type</label></div>
                    <div className={styles.data}>{item.Promoted_x0020_asset}</div>
                  </div>
                  <div>
                    <div><label>Industry</label></div>
                    <div className={styles.data}>{item.IndustryId != undefined || item.IndustryId != null ? SetIndustry(item.IndustryId) : ""}</div>
                  </div>
                  <div>
                    <div><label>Sub-team</label></div>
                    <div className={styles.data}>{item.Sub_x002d_team}</div>
                  </div>
                  <div>
                    <div><label>Amplify only?</label></div>
                    <div className={styles.data}>{item.SocialChannels}</div>
                  </div>
                  <div>
                    <div><label>Marketing goals | KPI </label></div>
                    <div className={styles.data}>{item.Marketinggoals}</div>
                  </div>
                  <div>
                    <div><label>Campaign </label></div>
                    <div className={styles.data}>{item.CampaignId}</div>
                  </div>
                  <div>
                    <div><label>Solutions </label></div>
                    <div className={styles.data}>{item.Solutions}</div>
                  </div>
                </div>
                <br />
                <a href={'https://siemensnam.sharepoint.com/teams/disw_STSMarketingPortal/Lists/Trial_PDC_Social_Calendar/DispForm.aspx?ID=' + item.ID} target='blank'>View More</a>
                <DefaultButton style={{ float: "right" }} onClick={hidePopup}>Close</DefaultButton>
              </div>
            </FocusTrapZone>
          </Popup>
        </Layer>
      )}
    </>
  );
};
