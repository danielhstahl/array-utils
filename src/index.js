const leftjoin=(leftArray=[], rightArray=[], condition=(left, right)=>left===right, manageResult=(left, right)=>right?right:left)=>{
    return leftArray.map(left=>{
        const result=rightArray.filter(right=>condition(left, right))[0]
        return manageResult(left, result);
    })
}
const innerjoin=(leftArray=[], rightArray=[], condition=(left, right)=>left===right)=>{
    return leftArray.filter(left=>{
        return rightArray.filter(right=>condition(left, right))[0]
    })
}
const convertArrayToObjByKey=(arr=[], key)=>arr.reduce((aggr, val)=>Object.assign({}, aggr, {[val[key]]:val}), {})

const unionObj=(obj1={}, obj2={}, arr1=[], arr2=[], leftKey="", rightKey="", manageResult=(left, right)=>right?right:left)=>{
    return [
        ...arr1.map(
            val=>manageResult(obj1[val[leftKey]], obj2[val[leftKey]])
        ), 
        ...arr2.filter(val=>!obj1[val[rightKey]]).map(
            val=>manageResult(obj1[val[rightKey]], obj2[val[rightKey]])
        )
    ]
}
const outerjoin=(leftArray=[], rightArray=[], leftKey="", rightKey="", manageResult=(left, right)=>right?right:left)=>{
    const createObjFromLeft=convertArrayToObjByKey(leftArray, leftKey)
    const createObjFromRight=convertArrayToObjByKey(rightArray, rightKey)
    return unionObj(createObjFromLeft, createObjFromRight, leftArray, rightArray, leftKey, rightKey, manageResult)
}
const convertArrayToObj=(arr=[])=>arr.reduce((aggr, val)=>Object.assign({}, aggr, {[val]:true}), {})

const hasLengthGreaterThanZero=(arr=[])=>arr.length>0?true:false

const getUniqueArray=(array, key)=>key?array.sort((a, b)=>a[key]>b[key]).filter((val, index, arr)=>!index||val[key]!==arr[index-1][key]):array.sort().filter((val, index, arr)=>!index||val!==arr[index-1])//ensure unique values

module.exports.leftjoin=leftjoin
module.exports.innerjoin=innerjoin
module.exports.convertArrayToObj=convertArrayToObj
module.exports.getUniqueArray=getUniqueArray
module.exports.hasLengthGreaterThanZero=hasLengthGreaterThanZero
module.exports.outerjoin=outerjoin
module.exports.convertArrayToObjByKey=convertArrayToObjByKey
