// 格式化汽车属性
export function formatCarsAttr(val){
    if(!val) { return ""; }
    // 1.字符串转Json对象
    return JSON.parse(val);
}

// 获取指定属性的key的值 
export function getCarsAttrKey(params){
    if(!params.data) { return ""; }
    // 1.字符串转Json对象 格式化汽车属性数据
    const data = formatCarsAttr(params.data);
    // 判断数据存在，并返回
    // 自定义属性(carsBody).属性(车座位)
    if(data[params.parerntKey] && data[params.parerntKey][params.childKey]) {
        return data[params.parerntKey][params.childKey];
    }
    return ""
}