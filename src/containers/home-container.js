import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { TitlePanel } from "../components/panel/panel";
import Button from "../components/button/button";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { includes } from "lodash/collection";
import AppearanceContext from "../context/apperance-context";
import { login } from "../redux/actions/app";
import { uploadRuleset } from "../redux/actions/rule";

function readFile(file, cb) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      cb(JSON.parse(reader.result), file.name);
    } catch (e) {
      cb(undefined, undefined, e.message);
    }
  };
  reader.readAsText(file);
}

const HomeContainer = ({
  rulenames = [],
  initialRuleset = [],
  uploadRuleset = () => {},
  login = () => {},
  loggedIn = false
}) => {
  const [files, setFiles] = useState([]);
  // const [uploadError, setUploadError] = useState(false);
  // const [fileExist, setFileExist] = useState(false);
  // const [message, setMessage] = useState({});
  const appctx = useContext(AppearanceContext);

  const [ruleset, setRuleset] = useState(initialRuleset); // Consolidated ruleset state

  const allowDrop = (e) => {
    e.preventDefault();
  };

  const printFile = (file, name, error) => {
    if (error) {
      // setUploadError(true);
      // setFileExist(false);
      // setMessage("");
    } else {
      const isFileAdded =
        files.some((fname) => fname === name) || includes(rulenames, file.name);
      if (!isFileAdded) {
        setFiles([...files, name]);
        setRuleset([...ruleset, file]);
        // setFileExist(false);
      } else {
        // setFileExist(true);
        // setMessage("");
      }
    }
  };

  const uploadFile = (items, index) => {
    const file = items[index].getAsFile();
    readFile(file, printFile);
  };

  const uploadDirectory = (item) => {
    const dirReader = item.createReader();
    dirReader.readEntries((entries) => {
      entries.forEach((subItem) => {
        if (subItem.isFile) {
          subItem.file((file) => {
            readFile(file, printFile);
          });
        }
      });
    });
  };

  const chooseDirectory = (e) => {
    const files = e.target.files;
    Array.from(files).forEach((file) => {
      if (file.type === "application/json") {
        readFile(file, printFile);
      }
    });
  };

  const drop = (e) => {
    e.preventDefault();
    const items = e.dataTransfer.items;
    Array.from(items).forEach((item, i) => {
      const entry = item.webkitGetAsEntry();
      if (entry.isFile) {
        uploadFile(items, i);
      } else if (entry.isDirectory) {
        uploadDirectory(entry);
      }
    });
  };

  const handleUpload = () => {
    if (ruleset.length > 0) {
      uploadRuleset(ruleset);
      navigate("/ruleset");
    }
  };

  const history = useNavigate();
  const navigate = (location) => {
    login();
    history(location);
  };

  const title = loggedIn ? "Upload Rules" : "Create / Upload Rules";

  return (
    <div className="home-container">
      <div className="single-panel-container">
        <TitlePanel title={title} titleClass={faCloudArrowUp}>
          <div className="upload-panel">
            <div
              className={`drop-section ${appctx.background}`}
              onDrop={drop}
              onDragOver={allowDrop}
            >
              <div>
                <label htmlFor="uploadFile">
                  Choose Ruleset directory
                  <input
                    id="uploadFile"
                    type="file"
                    onChange={chooseDirectory}
                    webkitdirectory="true"
                    multiple
                  />
                </label>{" "}
                or Drop Files
              </div>
              {files.length > 0 && (
                <div className="file-drop-msg">{`${files.length} json files are dropped!`}</div>
              )}
            </div>
          </div>
          <div className="btn-group">
            <Button
              label={"Upload"}
              onConfirm={handleUpload}
              classname="primary-btn"
              type="button"
            />
            {!loggedIn && (
              <Button
                label={"Create"}
                onConfirm={() => navigate("/create-ruleset")}
                classname="primary-btn"
                type="button"
                disabled={files.length > 0}
              />
            )}
          </div>
        </TitlePanel>
      </div>
    </div>
  );
};

HomeContainer.propTypes = {
  rulenames: PropTypes.array,
  initialRuleset: PropTypes.array,
  uploadRuleset: PropTypes.func,
  login: PropTypes.func,
  loggedIn: PropTypes.bool
};

const mapStateToProps = (state) => ({
  rulenames: state.ruleset.rulesets.map((r) => r.name),
  loggedIn: state.app.loggedIn
});

const mapDispatchToProps = {
  login,
  uploadRuleset
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
