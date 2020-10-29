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

const MARGIN_LEFT = 20;
const MARGIN_BOTTOM = 10;

const getMarginLeft = (level: number, type: string) => {
  return level * MARGIN_LEFT;
  // if (type === "file") paddingLeft += 20;
  // return paddingLeft;
};

const StyledTreeNode = styled.div`
  background: greenyellow;
  margin-bottom: ${MARGIN_BOTTOM}px;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  padding: 5px 8px;
  margin-left: ${(props: { level: number; type: string }) =>
    getMarginLeft(props.level, props.type)}px;

  &:hover {
    background: lightgray;
  }
`;

const StyledTreeNodeHor = styled.div`
  left: -${MARGIN_LEFT - MARGIN_LEFT / 2}px;
  position: absolute;
  width: ${MARGIN_LEFT - MARGIN_LEFT / 2}px;
  height: 1px;
  background-color: #000;
`;

const StyledTreeNodeVer = styled.div`
  left: -${MARGIN_LEFT - MARGIN_LEFT / 2}px;
  position: absolute;
  width: 1px;
  height: ${MARGIN_BOTTOM + 17}px;
  transform: translateY(${-(MARGIN_BOTTOM + 17) / 2}px);
  background-color: #000;
`;

const NodeIcon = styled.div`
  font-size: 12px;
  margin-right: ${(props: { marginRight?: number }) =>
    props.marginRight ? props.marginRight : 5}px;
`;

const getNodeLabel = (node: TreeNodeType) => last(node.path.split("/"));

const getNumberOfNodeAbove = (
  node: TreeNodeType,
  nodes: Record<string, TreeNodeType>
) => {
  const lastIndexOfLash = node.path.lastIndexOf("/");
  // const parent =
};

interface TreeNodeProps {
  nodes: Record<string, TreeNodeType>;
  node: TreeNodeType;
  getChildNodes: (node: TreeNodeType) => TreeNodeType[];
  onToggle: (node: TreeNodeType) => void;
  onNodeSelect: (node: TreeNodeType) => void;
  level?: number;
}

const TreeNode: FC<TreeNodeProps> = (props) => {
  const {
    node,
    getChildNodes,
    level = 0,
    onToggle,
    onNodeSelect,
    nodes,
  } = props;

  const childNodes = getChildNodes(node);

  console.log(getNumberOfNodeAbove(node, nodes));

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

        {node.isRoot ? null : (
          <>
            <StyledTreeNodeHor />
            <StyledTreeNodeVer />
          </>
        )}

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
