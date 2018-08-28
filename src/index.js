import hash from 'object-hash';
import ency from 'object-encrypt-decrypt';

function init() {
    const store = localStorage.getItem('store');
    if(!store){
        localStorage.setItem('store',{id: 0});
    }
}
init();
function createGenesisNode(node) {
    node.data = ency.encrypt(node.data);
    let store = {};
    Object.assign(store,JSON.parse(localStorage.getItem('store')));
    if(!store){
        if(store[node.nodeId] !== null){
            return false;
        }
        store[node.nodeId] = node;
        store.id = node.nodeId;
        localStorage.setItem('store',JSON.stringify(store));
        return node.nodeId;
    }
}

function createChildNode(node){
    let store = {};
    Object.assign(store,JSON.parse(localStorage.getItem('store')));
    if(store[node.nodeId] !== null){
        return false;
    }
    const pNode = store[node.referenceNI];
    if(pNode){
        const pData = ency.decrypt(pNode.data);
        const siblings = pNode.childReferenceNI;
        let sum = 0;
        for(let i = 0; i < siblings.length;i++){
            sum += getValue(siblings[i]);
        }
        if(sum+node.data <= getValue(nodeId, store)){
            node.data = ency.encrypt(node.data);
            if(siblings){
                pNode.childReferenceNI[siblings.length+1] = node.nodeId;
            } else {
                pNode.childReferenceNI = [];
                pNode.childReferenceNI[0] = node.nodeId;
            }
            store[node.nodeId] = node;
            store.id = node.nodeId;
            localStorage.setItem('store',JSON.stringify(store));
            return node.nodeId;
        }
        return false;
    } else {
        return false;
    }
}
function getValue(nodeId, store){
    const node = store[node.nodeId];
    const data = ency.decrypt(node.data);
    return data.value;
}

function createNode(node){
    const newNode = {};
    if(node.data || node.nodeNumber || password){
        Object.assign(newNode, node);
    } else {
        return false;
    }
    if(node.timestap){
        newNode.timestamp = node.timestamp;
    } else {
        newNode.timestamp = Date.now();
    }
    const store = JSON.parse(localStorage.getItem('store'));
    newNode.nodeId = store.id++;
    newNode.data.hashValue = hash(node.data);
    newNode.hashValue = hash(node);
    newNode.password = hash(node.password);
}