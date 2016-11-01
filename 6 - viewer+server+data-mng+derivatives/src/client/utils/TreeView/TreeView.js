import EventsEmitter from 'EventsEmitter'

/////////////////////////////////////////////////////////////////////
//
//
/////////////////////////////////////////////////////////////////////
export class BaseTreeDelegate extends
  EventsEmitter.Composer (Autodesk.Viewing.UI.TreeDelegate) {

  ///////////////////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////////////////
  constructor (container, contextMenu) {

    super()

    this.contextMenu = contextMenu

    this.container = container

    this.clickTimeout = 0
  }

  ///////////////////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////////////////
  getTreeNodeId (node) {

    return node.id
  }

  ///////////////////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////////////////
  isTreeNodeGroup (node) {

    return node.group
  }

  ///////////////////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////////////////
  onTreeNodeIconClick (tree, node, event) {

    clearTimeout(this.clickTimeout)

    this.clickTimeout = setTimeout(() => {

      tree.setCollapsed(node, !tree.isCollapsed(node))

      this.emit('node.iconClick', node)

    }, 200)
  }

  ///////////////////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////////////////
  nodeClickSelector (event) {

    const selector = ['HEADER', 'LABEL']

    return (selector.indexOf(event.path[0].nodeName) > -1)
  }

  ///////////////////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////////////////
  onTreeNodeClick (tree, node, event) {

    if (this.nodeClickSelector(event)) {

      clearTimeout(this.clickTimeout)

      this.clickTimeout = setTimeout(() => {

        tree.setCollapsed(node, !tree.isCollapsed(node))

      }, 200)
    }
  }

  ///////////////////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////////////////
  onTreeNodeDoubleClick (tree, node, event) {

    if (this.nodeClickSelector(event)) {

      clearTimeout(this.clickTimeout)

      this.emit('node.dblClick', node)
    }
  }

  ///////////////////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////////////////
  onTreeNodeRightClick (tree, node, event) {

    event.stopPropagation()
    event.preventDefault()

    if (this.nodeClickSelector(event)) {

      this.contextMenu.show(event, node)
    }
  }

  ///////////////////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////////////////
  getTreeNodeLabel (node) {

    return node.name
  }
}

/////////////////////////////////////////////////////////////////////
//
//
/////////////////////////////////////////////////////////////////////
export class TreeNode extends EventsEmitter {

  /////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////
  constructor (properties) {

    super()

    Object.assign(this, properties)
  }
}