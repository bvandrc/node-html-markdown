import * as NHParser from 'node-html-parser';
import { CommentNode, NodeType } from 'node-html-parser';
import { isCollapsibleWhitespace } from './utilities';


/* ****************************************************************************************************************** */
// region: Types
/* ****************************************************************************************************************** */

export { NodeType, CommentNode }

/* ********************************************************* *
 * Merged Nodes - Unions of node-html-parser and common DOM
 * ********************************************************* */

type NodeBase = { preserve?: boolean }

export type HtmlNode = (NHParser.Node | Node) & NodeBase
export type ElementNode = (NHParser.HTMLElement | HTMLElement) & NodeBase
export type TextNode = (NHParser.TextNode) & NodeBase & { readonly isCollapsibleWhitespace: boolean }

// endregion


/* ****************************************************************************************************************** */
// region: Node Extensions
/* ****************************************************************************************************************** */

/**
 * Like node-html-parser's `isWhitespace`, but by the whitespace HTML collapses, which leaves out NBSP and `&nbsp;`
 */
if (!Object.prototype.hasOwnProperty.call(NHParser.TextNode.prototype, 'isCollapsibleWhitespace'))
  Object.defineProperty(NHParser.TextNode.prototype, 'isCollapsibleWhitespace', {
    get(this: NHParser.TextNode) { return isCollapsibleWhitespace(this.rawText); },
    configurable: true
  });

// endregion


/* ****************************************************************************************************************** */
// region: TypeGuards
/* ****************************************************************************************************************** */

export const isTextNode = (node: HtmlNode): node is TextNode => node.nodeType === NodeType.TEXT_NODE;
export const isCommentNode = (node: HtmlNode): node is CommentNode => node.nodeType === NodeType.COMMENT_NODE;
export const isElementNode = (node: HtmlNode): node is ElementNode => node.nodeType === NodeType.ELEMENT_NODE;

// endregion
