import {
    handleTabDisplay,
    createTab,
    createSideBar
} from "./dialogTabs/index.js";
import { createInputter,handleInputter } from "./inputter.js";
import { plugin } from "../../asyncModules.js";
import { string2DOM } from "../builders/index.js";



export function buildSettingUI(settingList, base = '') {
    let keys = plugin.configurer.query(settingList, base);
    let frag = document.createDocumentFragment();
    let pathArray = keys[0].path.split('.');
    let sideBarFragment = string2DOM(`<ul class="b3-tab-bar b3-list b3-list--background"></ul>`);
    let tabWrapper = string2DOM(`<div class="config__tab-wrap"></div>`);
    for (let i = 0; i < keys.length; i++) {
        let item = keys[i];
        if (item.error) {
            continue;
        }
        let pathArray = base ? item.path.replace(base, '').split('.').filter(item => { return item !== '' }) : item.path.split('.');
        let fullPath = base ? `${base}.${pathArray.join('.')}` : pathArray.join('.');
        let li = createSideBar(pathArray, sideBarFragment, tabWrapper);
        let tab = createTab(pathArray, tabWrapper);
        sideBarFragment.appendChild(li);
        tabWrapper.appendChild(tab);
        let elementGenerator = 获取设置UI(...fullPath.split('.'));
        let inputter = elementGenerator();
        handleInputter(inputter, pathArray, tab, tabWrapper);
    }
    handleTabDisplay(tabWrapper);
    frag.appendChild(sideBarFragment);
    frag.appendChild(tabWrapper);
    return frag;
}

export function 获取设置UI(...args) {
    let UI生成函数 = plugin.statusMonitor.get('settingElements', ...args);
    if (!UI生成函数()) {
        let item = plugin.configurer.get(...args).$value;
        let elementGenerator;
        switch (typeof item) {
            case 'string':
                elementGenerator = () => createInputter(args, 'text', item, (value, element) => { element.value = value; });
                break;
            case 'number':
                elementGenerator = () => createInputter(args, 'number', item, (value, element) => { element.value = value; });
                break;
            case 'boolean':
                elementGenerator = () => createInputter(args, 'checkbox', item, (value, element) => { element.checked = value; });
                break;
            default:
                elementGenerator = () => {
                    let element = document.createElement('input');
                    element.type = 'text';
                    element.value = '属性不合法或不存在';
                    element.disabled = true;
                    return element;
                };
                break;
        }
        return elementGenerator;
    } else {
        return UI生成函数;
    }
}