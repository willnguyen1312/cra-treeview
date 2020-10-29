import React, { Component } from "react";
import styled from "styled-components";
import { TreeNodeType } from "../types";
import Tree from "./Tree";

const StyledFileExplorer = styled.div`
  width: 800px;
  max-width: 100%;
  margin: 0 auto;
  display: flex;
`;

const TreeWrapper = styled.div`
  width: 250px;
`;

interface FileExplorerState {
  selectedNode?: TreeNodeType;
}

export default class FileExplorer extends Component<{}, FileExplorerState> {
  state: FileExplorerState = {};

  onSelect = (node: TreeNodeType) => this.setState({ selectedNode: node });

  render() {
    const { selectedNode } = this.state;

    return (
      <StyledFileExplorer>
        <TreeWrapper>
          <Tree onSelect={this.onSelect} />
        </TreeWrapper>
        <div>
          {selectedNode && selectedNode.type === "file" && selectedNode.content}
        </div>
      </StyledFileExplorer>
    );
  }
}
