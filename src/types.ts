export interface TreeNodeType {
  path: string;
  type: string;
  isRoot?: boolean;
  children?: string[];
  isOpen?: boolean;
  content?: string;
}
