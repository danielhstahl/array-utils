const arrayUtils=require('./index.js')
const leftArray=[
    {id:1, val:5},{id:2, val:6},{id:3, val:7},
]
const rightArray=[{id:2, val:6, another:4}]

it('correctly turns array into keys', ()=>{
    const arr=["one", "two", "three"]
    const expected={one:true, two:true, three:true}
    expect(arrayUtils.convertArrayToObj(arr)).toEqual(expected)
})
it('returns empty object when provided empty array', ()=>{
    const arr=[]
    const expected={}
    expect(arrayUtils.convertArrayToObj(arr)).toEqual(expected)
})

it('returns all matches', () => {
    const comb=arrayUtils.leftjoin(leftArray, rightArray, (left, right)=>left.id===right.id);
    expect(comb).toEqual([{id:1, val:5},{id:2, val:6, another:4},{id:3, val:7},])
});

it('returns only matches', () => {
    const comb=arrayUtils.innerjoin(leftArray, rightArray, (left, right)=>left.id===right.id);
    expect(comb).toEqual([{id:2, val:6}])
});

it('returns unique array without last 1', ()=>{
    const arr=[1, 2, 3, 1]
    const expectedResult=[1, 2, 3]
    expect(arrayUtils.getUniqueArray(arr)).toEqual(expectedResult);
})
it('returns unique array with only 1', ()=>{
    const arr=[1, 1, 1, 1]
    const expectedResult=[1]
    expect(arrayUtils.getUniqueArray(arr)).toEqual(expectedResult);
})