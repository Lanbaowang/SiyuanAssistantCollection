export function 将向量单位化(输入向量) {
    let 平方和 = 输入向量.reduce((acc, cur) => acc + cur * cur, 0);
    let 长度 = Math.sqrt(平方和);
    let 单位化向量 = 输入向量.map(value => value / 长度);
    return 单位化向量
}
export function getWeightedMeanVectors(向量组, 权重组, 是否单位化结果) {
    let 总向量 = []
    for (let i = 0; i < 向量组[0].length; i++) {
        let sum = 0;
        for (let j = 0; j < 向量组.length; j++) {
            //计权相加
            sum += 向量组[j][i] * 权重组[j];
        }
        总向量.push(sum);
    }
    let 加权平均向量 = 总向量.map((value, index) => value / 向量组.length);
    if (是否单位化结果) {
        let 单位化向量 = 将向量单位化(加权平均向量)
        return 单位化向量
    } else {
        return 加权平均向量
    }
}
export async function 创建简单短哈希(文本,短码长度=8) {
    const 编码器 = new TextEncoder();
    const 编码结果 = 编码器.encode(文本);
    const hashBuffer = await crypto.subtle.digest('SHA-256', 编码结果);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const 哈希值 = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    const 短哈希值 = 哈希值.substring(0, 短码长度);
    return 短哈希值;
}
export const 计算向量相似度=(输入点, 点数据集, 相似度算法)=>{
    let 拷贝点
    if (!Array.isArray(输入点)) {
        拷贝点 = JSON.parse(输入点)
    } else {
        拷贝点 = 输入点
    }
    let similarityScores = [];
    for (let v of 点数据集) {
        let similarity = 相似度算法(拷贝点, v.vector);
        similarityScores.push({
            data: v,
            score: similarity
        });
    }
    return similarityScores;
}
export const 计算欧氏距离相似度=(vector1, vector2)=>{
    let sum = 0;
    for (let i = 0; i < vector1.length; i++) {
        sum += Math.pow(vector1[i] - vector2[i], 2);
    }
    return Math.sqrt(sum);
}

/*
// CosineSimilarity = (A*B)/(|A|*|B|)
export const calculateCosineSimilarity = (vector1, vector2) => {
    let dotProduct = 0;
    let magnitude1 = 0;
    let magnitude2 = 0;
    for (let i = 0; i < vector1.length; i++) {
        const val1 = vector1[i] || 0;
        const val2 = vector2[i] || 0;
        dotProduct += val1 * val2;
        magnitude1 += val1 * val1;
        magnitude2 += val2 * val2;
    }
    magnitude1 = Math.sqrt(magnitude1);
    magnitude2 = Math.sqrt(magnitude2);
    if (magnitude1 === 0 || magnitude2 === 0) {
        return 0; // To avoid division by zero
    }
    return dotProduct / (magnitude1 * magnitude2);
}
*/

/*
*标准化向量：当两个向量已经预先被标准化（即每个向量都除以其模长，转换成单位向量），此时它们的点积直接等于余弦相似度。标准化向量的长度为1，所以点积除以模长的操作已经完成
*计算两个向量的点积可以间接提供它们余弦相似度的信息，而不需要直接计算余弦相似度。
*/
export const 计算余弦相似度=(vector1, vector2)=>{
    //假设这些向量已经全部正规化了
    let dotProduct = 0;
    for (let i = 0; i < vector1.length; i++) {
      dotProduct += vector1[i] * vector2[i];
    }
    return dotProduct;
}

export function 查找最相似点(输入点, 点数据集, 查找阈值 = 10, 相似度算法=计算余弦相似度, 过滤条件) {
    let 拷贝点
    if (!Array.isArray(输入点)) {
        拷贝点 = JSON.parse(输入点)
    } else {
        拷贝点 = 输入点
    }
    let similarityScores = [];
    for (let v of 点数据集) {
        let similarity = 相似度算法(拷贝点, v.vector);
        similarityScores.push({
            data: v,
            score: similarity
        });
    }
    //前置过滤得了
    if (过滤条件) {
        similarityScores = similarityScores.filter(i => {
            return 过滤条件(i)
        })
    }
    similarityScores.sort((a, b) => b.score - a.score);
    let tops = similarityScores.slice(0, 查找阈值)
    return tops;
}
export {查找最相似点 as findSimilarity}