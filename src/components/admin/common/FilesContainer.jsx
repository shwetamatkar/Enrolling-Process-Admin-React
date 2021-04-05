import React, { PureComponent } from "react";
import { Paper, Typography, Divider, List } from "@material-ui/core";
import UploadedFile from "./UploadedFile";

class FilesContainer extends PureComponent {
  render() {
    const { items } = this.props;

    return (
      <div>
        <div style={{ backgroundColor: "black", padding: 15 }}>
          <Typography style={{ color: "#fff" }}>Files</Typography>
        </div>
        <Paper>
          <List>
            {items.map((data, index) => (
              <div key={index}>
                <UploadedFile
                  data={data}
                  handleFileSelect={this.props.handleFileSelect}
                />
                {index !== items.length - 1 ? <Divider /> : <div></div>}
              </div>
            ))}
          </List>
        </Paper>
      </div>
    );
  }
}

export default FilesContainer;
