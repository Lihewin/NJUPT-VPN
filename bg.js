// 将字符串转换为 ArrayBuffer
function str2ab(str) {
    var buf = new ArrayBuffer(str.length);
    var bufView = new Uint8Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}

// 将 ArrayBuffer 转换为十六进制字符串
function ab2hex(buffer) {
    return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
}

// AES-CBC 加密函数
async function encrypt(domainWithPort) {
    const key = await crypto.subtle.importKey(
        "raw",
        str2ab("CASB2021EnLink!!"),
        { name: "AES-CBC" },
        false,
        ["encrypt"]
    );
    
    const iv = str2ab("CASB2021EnLink!!");

    const encrypted = await crypto.subtle.encrypt(
        {
            name: "AES-CBC",
            iv: iv
        },
        key,
        str2ab(domainWithPort)
    );

    return ab2hex(encrypted);
}

// 监听 action 点击事件
chrome.action.onClicked.addListener(async function (tab) {
    // 目标 VPN 地址前缀
    const httpsVpnPrefix = "https://vpn.njupt.edu.cn:8443/https/webvpn";
    const httpVpnPrefix = "https://vpn.njupt.edu.cn:8443/http/webvpn";

    // 解析当前 URL
    let url = new URL(tab.url);
    let domainWithPort = url.host; // 包括域名和端口（如果有）

    if (url.protocol === "https:") {
        // 如果协议是 HTTPS
        if (!tab.url.startsWith(httpsVpnPrefix)) {
            // 使用 AES-CBC 加密域名+端口
            let encryptedDomain = await encrypt(domainWithPort);

            // 构造新的 URL
            let newUrl = httpsVpnPrefix + encryptedDomain + url.pathname + url.search + url.hash;

            // 跳转到新的 URL
            chrome.tabs.create({ url: newUrl });
        }
    } else if (url.protocol === "http:") {
        // 如果协议是 HTTP
        if (!tab.url.startsWith(httpVpnPrefix)) {
            // 使用 AES-CBC 加密域名+端口
            let encryptedDomain = await encrypt(domainWithPort);

            // 构造新的 URL
            let newUrl = httpVpnPrefix + encryptedDomain + url.pathname + url.search + url.hash;

            // 跳转到新的 URL
            chrome.tabs.create({ url: newUrl });
        }
    }
});