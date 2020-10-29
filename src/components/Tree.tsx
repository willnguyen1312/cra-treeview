import React, { Component } from "react";
import { values } from "lodash-es";

import { TreeNodeType } from "../types";
import TreeNode from "./TreeNode";

const data: Record<string, TreeNodeType> = {
  "/root": {
    path: "/root",
    type: "folder",
    isRoot: true,
    isOpen: true,
    children: ["/root/nam", "/root/vi"],
  },
  "/root/nam": {
    path: "/root/nam",
    type: "folder",
    children: ["/root/nam/about.md"],
  },
  "/root/nam/about.md": {
    path: "/root/nam/about.md",
    type: "file",
    content: "Thanks for coming by 😋",
  },
  "/root/vi": {
    path: "/root/vi",
    type: "folder",
    children: ["/root/vi/jobs", "/root/vi/blogs"],
  },
  "/root/vi/jobs": {
    path: "/root/vi/jobs",
    type: "folder",
    children: ["/root/vi/jobs/qa"],
  },
  "/root/vi/jobs/qa": {
    path: "/root/vi/jobs/qa",
    type: "folder",
    children: [],
  },
  "/root/vi/blogs": {
    path: "/root/vi/blogs",
    type: "folder",
    children: [],
  },
};

interface TreeProps {
  onSelect: (node: TreeNodeType) => void;
}

interface TreeState {
  nodes: Record<string, TreeNodeType>;
}

export default class Tree extends Component<TreeProps, TreeState> {
  state: TreeState = {
    nodes: data,
  };

  getRootNodes = () => {
    const { nodes } = this.state;
    return values(nodes).filter((node) => node.isRoot === true);
  };

  getChildNodes = (node: TreeNodeType) => {
    const { nodes } = this.state;
    if (!node.children) return [];
    return node.children.map((path) => nodes[path]);
  };

  onToggle = (node: TreeNodeType) => {
    const { nodes } = this.state;
    nodes[node.path].isOpen = !node.isOpen;
    this.setState({ nodes });
  };

  onNodeSelect = (node: TreeNodeType) => {
    const { onSelect } = this.props;
    onSelect(node);
  };

  render() {
    const rootNodes = this.getRootNodes();
    return (
      <div>
        {rootNodes.map((node) => (
          <TreeNode
            key={node.path}
            node={node}
            getChildNodes={this.getChildNodes}
            onToggle={this.onToggle}
            onNodeSelect={this.onNodeSelect}
          />
        ))}
      </div>
    );
  }
}
