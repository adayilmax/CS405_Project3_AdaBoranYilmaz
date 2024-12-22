/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */

class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        if (parent) {
            this.parent.__addChild(this);
        }
    }

    __addChild(node) {
        this.children.push(node);
    }

    draw(mvp, modelView, normalMatrix, modelMatrix) {
        /**
         * @Task1 : Implement the draw function for the SceneNode class.
         */

        // 1) Get the local transformation matrix from this node’s TRS.
        let localMatrix = this.trs.getTransformationMatrix();
        
        // 2) Combine the parent's transformations with the child's local transformations.
        //    We'll transform the model matrix, modelView, mvp, and normal matrices accordingly.
        let currentModelMatrix  = MatrixMult(modelMatrix, localMatrix);
        let currentModelView    = MatrixMult(modelView, localMatrix);
        let currentMVP          = MatrixMult(mvp, localMatrix);
        let currentNormalMatrix = getNormalMatrix(currentModelView);

        // 3) Draw the mesh for the current node (if any).
        if (this.meshDrawer) {
            this.meshDrawer.draw(currentMVP, currentModelView, currentNormalMatrix, currentModelMatrix);
        }

        // 4) Recursively draw the children using the newly updated matrices.
        for (let i = 0; i < this.children.length; i++) {
            this.children[i].draw(currentMVP, currentModelView, currentNormalMatrix, currentModelMatrix);
        }
    }
}
