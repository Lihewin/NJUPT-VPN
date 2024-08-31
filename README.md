# NJUPT-VPN

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

一个Chromium扩展，允许你一键通过校园VPN访问任何网址。此项目为[NUIST-VPN](https://github.com/qwertycxz/NUIST-VPN)的fork。

本仓库包含以下内容:

1.一份由AI编写的chromium扩展;

2.一份由AI起草的README.md。

## 背景

与原项目相同，本扩展的唯一目标:

> 实现"一键VPN访问"的功能。

但是，与原项目不同，根据[Dustella](https://www.dustella.net/)的工作，这个扩展能够直接对将要访问的域名进行加密并访问，省去了原项目中跳转的步骤。

## 安装
crx插件已经打包在release中，作为pre-release发布。

由于包含可能的隐私信息与插件本身的不成熟，没有发布到扩展商店的计划。所以请根据以下步骤，自行安装到你的chromium based浏览器。

### Windows
使用管理员权限powershell，执行以下添加注册表操作，从而实现添加扩展白名单的作用
```powershell
# 设置 Chrome 扩展允许列表
$chromeKey = "HKLM:\SOFTWARE\Policies\Google\Chrome\ExtensionInstallAllowlist"
$chromeExtensionID = "dlokedikbaeopgkbbhlfgeiiaapjiiek"
New-Item -Path $chromeKey -Force | Out-Null
Set-ItemProperty -Path $chromeKey -Name "1" -Value $chromeExtensionID

# 设置 Edge 扩展允许列表
$edgeKey = "HKLM:\SOFTWARE\Policies\Microsoft\Edge\ExtensionInstallAllowlist"
$edgeExtensionID = "dlokedikbaeopgkbbhlfgeiiaapjiiek"
New-Item -Path $edgeKey -Force | Out-Null
Set-ItemProperty -Path $edgeKey -Name "1" -Value $edgeExtensionID

# 设置 Chromium 扩展允许列表
$chromiumKey = "HKLM:\SOFTWARE\Policies\Chromium\ExtensionInstallAllowlist"
$chromiumExtensionID = "dlokedikbaeopgkbbhlfgeiiaapjiiek"
New-Item -Path $chromiumKey -Force | Out-Null
Set-ItemProperty -Path $chromiumKey -Name "1" -Value $chromiumExtensionID
```
您可以选择性添加Chrome（上方）或者Edge（下方）的注册表。

### Mac、Linux或其他
请自行搜索解决。[Mac未经尝试的可能方案](https://github.com/pt-plugins/PT-Plugin-Plus/discussions/1066)

您也可以clone项目并直接以开发者身份加载。

总而言之请注意，这个crx的id为`dlokedikbaeopgkbbhlfgeiiaapjiiek`。

## 使用说明

在需要使用学校VPN访问的网址,单击右上角"NJUPT VPN"扩展即可。

## 使用许可

[Apache 2.0](LICENSE) © Lihewin

## 感谢
感谢[@Dustella](https://www.dustella.net/)的核心工作

感谢[@qwertycxz](https://github.com/qwertycxz)的原项目
