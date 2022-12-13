import { useState } from "react";
import CreateGeneralRecord from "./CreateGeneralRecord";
import CreateStockRecord from "./CreateStockRecord";
import LimitEditionRecord from "./LimitEditionRecord";

const AddRecord = ({ setIsLoggedIn }) => {
  const [toggleTabs, setToggleTabs] = useState(1);

  const toggleTab = (tabNumber) => {
    setToggleTabs(tabNumber);
  };

  return (
    <div className="add-div">
      <h3 className="section-title">ADD A SALES RECORD</h3>
      <div className="introduction">
        <p>
          You can add a record for product by clicking on the tabs below. You can add a General Sales
          Record, Baseline Sales Record, or Stock Record.
        </p>
      </div>
      <div className="tool-tabs-container">
        <div className="tool-tabs-div">
          <button
            className={
              toggleTabs === 1 ? "tools-tabs current-tools-tab" : "tools-tabs"
            }
            onClick={() => toggleTab(1)}
          >
            ADD SALES RECORD - GENERAL
          </button>
          <button
            className={
              toggleTabs === 2 ? "tools-tabs current-tools-tab" : "tools-tabs"
            }
            onClick={() => toggleTab(2)}
          >
            ADD STOCK RECORD
          </button>
          <button
            className={
              toggleTabs === 3 ? "tools-tabs current-tools-tab" : "tools-tabs"
            }
            onClick={() => toggleTab(3)}
          >
            ADD SALES RECORD - LIMIT EDITION
          </button>
        </div>
      </div>
      <div className="content-tabs-div">
        <div
          className={
            toggleTabs === 1
              ? "tools-content  current-tools-content"
              : "tools-content"
          }
        >
          <CreateGeneralRecord setIsLoggedIn={setIsLoggedIn} />
        </div>

        <div
          className={
            toggleTabs === 2
              ? "tools-content  current-tools-content"
              : "tools-content"
          }
        >
          <CreateStockRecord setIsLoggedIn={setIsLoggedIn} />
        </div>

        <div
          className={
            toggleTabs === 3
              ? "tools-content  current-tools-content"
              : "tools-content"
          }
        >
          <LimitEditionRecord setIsLoggedIn={setIsLoggedIn} />
        </div>
      </div>
    </div>
  );
};

export default AddRecord;
