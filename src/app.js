import hash from 'object-hash';
import ency from 'object-encrypt-decrypt';

hash({foo: 'bar'}) // => '67b69634f9880a282c14a0f0cb7ba20cf5d677e9'
hash([1, 2, 2.718, 3.14159]) // => '136b9b88375971dff9f1af09d7356e3e04281951'
console.log(hash({foo: 'bar'}));
console.log(hash([1, 2, 2.718, 3.14159]));
console.log(hash([1, 2, 2.718, 3.14159]));
console.log(ency.encrypt({foo: 'bar'}));
function init() {
    const store = localStorage.getItem('store');
    if(!store){
        localStorage.setItem('store',{});
    }
}
init();
function createGenesisNode(node) {
    const genNode = {};
    if(node.data || node.nodeNumber || node.nodeId || node.referenceNI
        || childReferenceNI || genesisReferenceNodeId
    ){
        Object.assign(genNode, node);
    } else {
        return;
    }
    if(node.timestap){
        genNode.timestamp = node.timestamp;
    } else {
        genNode.timestamp = Date.now();
    }
    genNode.hashValue = hash(genNode);
}