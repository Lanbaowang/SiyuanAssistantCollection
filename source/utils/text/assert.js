// source/utils/text/assert.js
const 虚词 = [
    '的',
    '地',
    '得',
    '和', 
    '或', 
    '并', 
    '之', 
    '于', 
    '以', 
    '抑', 
    '乃', 
    '则', 
    '者', 
    '又',
    '是'
];

export const 判定是否虚词开头或结尾 = (string) => {
    return 虚词.some(词 => string.startsWith(词) || string.endsWith(词));
};
// source/utils/text/assert.js
export const 判定是否标点符号开头结尾或全部 = (string) => {
    const 标点正则 = /^[\p{P}\p{S}]+$/u; // 检查字符串是否全部为标点符号，包括中文标点
    const 标点正则开头 = /^[\p{P}\p{S}]/u; // 检查开头是否为标点符号，包括中文标点
    const 标点正则结尾 = /[\p{P}\p{S}]$/u; // 检查结尾是否为标点符号，包括中文标点
    return 标点正则.test(string) || 标点正则开头.test(string) || 标点正则结尾.test(string);
};