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
  cursor: pointer;
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

  const childNodes = getChildNodes(node);

  return (
    <React.Fragment>
      <StyledTreeNode
        level={level}
        type={node.type}
        onClick={() => onToggle(node)}
      >
        <NodeIcon>
          {node.type === "folder" &&
            (node.isOpen ? <FaChevronDown /> : <FaChevronRight />)}
        </NodeIcon>

        <NodeIcon marginRight={10}>
          {node.type === "file" && (
            <FaFile size="2em" className="text-red-700" />
          )}
          {node.type === "folder" && node.isOpen === true && (
            <FaFolderOpen size="2em" className="text-blue-700" />
          )}
          {node.type === "folder" && !node.isOpen && (
            <FaFolder size="2em" className="text-blue-700" />
          )}
        </NodeIcon>

        <span
          role="button"
          onClick={() => {
            if (node.type === "file") {
              onNodeSelect(node);
            }
          }}
        >
          {getNodeLabel(node)}
        </span>
      </StyledTreeNode>

      {node.isOpen &&
        childNodes.map((childNode: TreeNodeType) => (
          <TreeNode
            key={childNode.path}
            {...props}
            node={childNode}
            level={level + 1}
          />
        ))}
    </React.Fragment>
  );
};

TreeNode.defaultProps = {
  level: 0,
};

export default TreeNode;
