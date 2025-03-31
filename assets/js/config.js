/**
 * 主配置文件
 * 导入并组合各个模块的配置
 */

import { languageConfig } from './config/language.js';
import { jetbraConfig } from './config/jetbraConfig.js';
import { pluginsConfig } from './config/plugins.js';
import { jetbra2099Config } from './config/jetbra2099Config.js';

const CONFIG = {
    // 应用设置
    settings: {
        ...languageConfig,
    },

    // 软件数据
    software: {
        // Jetbra 分类
        ...jetbraConfig,

        // 插件分类
        ...pluginsConfig,

        //2099
        ...jetbra2099Config,
    },

    // 界面文本
    text: {
        zh: {
            languageToggle: "切换语言",
            themeToggle: "切换主题",
            copyKey: "复制密钥",
            copySuccess: "复制成功！",
            noKey: "暂无密钥！",
            version: "版本",
            downloadInfo: {
                jetbra: "📥 下载 <a href='jetbraZip/files/jetbra-240701.zip' download>jetbra.zip (240701)</a> 按readme.txt安装！🚨 仅限测试使用！",
                plugins: "📥 插件可直接在IDE中安装，输入激活码即可使用！🚨 仅限测试使用！",
                jetbra2099: "📥 2099版本为长期支持版本，<a href='jetbraZip/files/JetBrains全家桶激活(2024最新激活2099).zip' download>点击下载</a> 按说明安装！🚨 仅限测试使用！现测试无法使用!"
            },
            disclaimer: "以上所有密钥均从互联网上收集，仅用于测试目的，不用于商业用途！个人页面，不是官方网站！",
            categories: {
                jetbra: "Jetbra",
                plugins: "插件",
                jetbra2099: "2099",
            }
        },
        en: {
            languageToggle: "Toggle Language",
            themeToggle: "Toggle Theme",
            copyKey: "Copy License",
            copySuccess: "Copied!",
            noKey: "No Key Available!",
            version: "Version",
            downloadInfo: {
                jetbra: "📥 Download <a href='jetbraZip/files/jetbra-240701.zip' download>jetbra.zip (240701)</a> Follow readme.txt! 🚨 For testing only!",
                plugins: "📥 Plugins can be installed directly in IDE with activation code! 🚨 For testing only!",
                jetbra2099: "📥 2099 version is LTS, <a href='jetbraZip/files/JetBrains-Activation-2099.zip' download>Download</a> Follow instructions! 🚨 Testing unavailable!"
            },
            disclaimer: "All keys collected from internet for testing only. Not for commercial use! Personal page, not official!",
            categories: {
                jetbra: "Jetbra",
                plugins: "Plugins",
                jetbra2099: "2099"
            }
        }
    }
}

export { CONFIG };