import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { TitlePanel } from "../components/panel/panel";
import Button from "../components/button/button";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { includes } from "lodash/collection";
import ApperanceContext from "../context/apperance-context";
import { login } from "../redux/actions/app";
import { uploadRuleset } from "../redux/actions/rule";

function readFile(file, cb) {
  var reader = new FileReader();
  reader.onload = () => {
    try {
      cb(JSON.parse(reader.result), file.name);
    } catch (e) {
      cb(undefined, undefined, e.message);
    }
  };
  reader.readAsText(file);
}

const HomeContainer = (props) => {
  const [uploadedFilesCount, setUploadedFilesCount] = useState(0);
  const [files, setFiles] = useState([]);
  const [ruleset, setRuleset] = useState([]);
  const [uploadError, setUploadError] = useState(false);
  const [fileExist, setFileExist] = useState(false);
  const [message, setMessage] = useState({});
  const appctx = useContext(ApperanceContext);

  const allowDrop = (e) => {
    e.preventDefault();
  };

  const printFile = (file, name, error) => {
    if (error) {
      setUploadError(true);
      setFileExist(false);
      setMessage("");
    } else {
      const isFileAdded =
        files.some((fname) => fname === name) ||
        includes(props.rulenames, file.name);
      if (!isFileAdded) {
        setFiles([...files, name]);
        setRuleset([...ruleset, file]);
        setFileExist(false);
      } else {
        const message = "";
        setFileExist(true);
        setMessage(message);
      }
    }
  };

  const uploadFile = (items, index) => {
    const file = items[index].getAsFile();
    readFile(file, printFile);
  };

  const uploadDirectory = (item) => {
    var dirReader = item.createReader();
    dirReader.readEntries(function (entries) {
      for (let j = 0; j < entries.length; j++) {
        let subItem = entries[j];
        if (subItem.isFile) {
          subItem.file((file) => {
            readFile(file, printFile);
          });
        }
      }
    });
  };

  const chooseDirectory = (e) => {
    const files = e.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        if (files[i].type === "application/json") {
          readFile(files[i], printFile);
        }
      }
    }
  };

  const drop = (e) => {
    e.preventDefault();
    const items = e.dataTransfer.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        let item = items[i].webkitGetAsEntry();
        if (item.isFile) {
          uploadFile(items, i);
        } else if (item.isDirectory) {
          uploadDirectory(item);
        }
      }
    }
  };

  const handleUpload = () => {
    if (ruleset.length > 0) {
      props.uploadRuleset(ruleset);
      navigate("./ruleset");
    }
  };

  const history = useNavigate();
  const navigate = (location) => {
    props.login();
    history(location);
  };

  const title = props.loggedIn ? "Upload Rules" : "Create / Upload Rules";

  return (
    <div className="home-container">
      <div className="single-panel-container">
        {/* {(fileExist || uploadError) && (
          <Notification
            body={message.body}
            heading={message.heading}
            type={message.type}
          />
        )} */}
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
                </label>
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
            {!props.loggedIn && (
              <Button
                label={"Create"}
                onConfirm={() => navigate("./create-ruleset")}
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
  ruleset: PropTypes.array,
  uploadRuleset: PropTypes.func,
  login: PropTypes.func,
  loggedIn: PropTypes.bool,
  rulenames: PropTypes.array,
};

HomeContainer.defaultProps = {
  rulenames: [],
  ruleset: [],
  uploadRuleset: () => false,
  login: () => false,
  loggedIn: false,
};

const mapStateToProps = (state) => ({
  rulenames: state.ruleset.rulesets.map((r) => r.name),
  loggedIn: state.app.loggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  login: () => dispatch(login()),
  uploadRuleset: (ruleset) => dispatch(uploadRuleset(ruleset)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
