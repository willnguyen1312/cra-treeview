import React, { FC } from "react";
import {
  FaFile,
  FaFolder,
  FaFolderOpen,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";
import styled from "styled-components";
import last from "lodash/last";
import { TreeNodeType } from "../types";

const getPaddingLeft = (level: number, type: string) => {
  let paddingLeft = level * 20;
  if (type === "file") paddingLeft += 20;
  return paddingLeft;
};

const StyledTreeNode = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 8px;
  padding-left: ${(props: { level: number; type: string }) =>
    getPaddingLeft(props.level, props.type)}px;

  &:hover {
    background: lightgray;
  }
`;

const NodeIcon = styled.div`
  font-size: 12px;
  margin-right: ${(props: { marginRight?: number }) =>
    props.marginRight ? props.marginRight : 5}px;
`;

const getNodeLabel = (node: TreeNodeType) => last(node.path.split("/"));

interface TreeNodeProps {
  node: TreeNodeType;
  getChildNodes: (node: TreeNodeType) => TreeNodeType[];
  onToggle: (node: TreeNodeType) => void;
  onNodeSelect: (node: TreeNodeType) => void;
  level?: number;
}

const TreeNode: FC<TreeNodeProps> = (props) => {
  const { node, getChildNodes, level = 0, onToggle, onNodeSelect } = props;

  return (
    <React.Fragment>
      <StyledTreeNode level={level} type={node.type}>
        <NodeIcon onClick={() => onToggle(node)}>
          {node.type === "folder" &&
            (node.isOpen ? <FaChevronDown /> : <FaChevronRight />)}
        </NodeIcon>

        <NodeIcon marginRight={10}>
          {node.type === "file" && <FaFile />}
          {node.type === "folder" && node.isOpen === true && <FaFolderOpen />}
          {node.type === "folder" && !node.isOpen && <FaFolder />}
        </NodeIcon>

        <span role="button" onClick={() => onNodeSelect(node)}>
          {getNodeLabel(node)}
        </span>
      </StyledTreeNode>

      {node.isOpen &&
        getChildNodes(node).map((childNode: TreeNodeType) => (
          <TreeNode {...props} node={childNode} level={level + 1} />
        ))}
    </React.Fragment>
  );
};

TreeNode.defaultProps = {
  level: 0,
};

export default TreeNode;
